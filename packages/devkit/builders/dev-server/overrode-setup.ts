import {
  BrowserBuilderOptions,
  DevServerBuilderOptions,
  OutputHashing
} from '@angular-devkit/build-angular';
import { envVariablesPlugin } from '../plugins/env-variables';
import {
  BuilderContext,
  targetFromTargetString
} from '@angular-devkit/architect';
import { normalizeOptimization } from '@angular-devkit/build-angular/src/utils';
import { checkPort } from '@angular-devkit/build-angular/src/utils/check-port';
import { purgeStaleBuildCache } from '@angular-devkit/build-angular/src/utils/purge-cache';
import * as webpack from 'webpack';
import * as path from 'path';
import {
  NormalizedCachedOptions,
  normalizeCacheOptions
} from '@angular-devkit/build-angular/src/utils/normalize-cache';
import { createTranslationLoader } from '@angular-devkit/build-angular/src/utils/load-translations';
import {
  addError,
  addWarning
} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import { generateEntryPoints } from '@angular-devkit/build-angular/src/utils/package-chunk-sort';
import { IndexHtmlWebpackPlugin } from '@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin';
import {
  generateI18nBrowserWebpackConfigFromContext,
  getIndexInputFile,
  getIndexOutputFile
} from '@angular-devkit/build-angular/src/utils/webpack-browser-config';
import {
  getAnalyticsConfig,
  getCommonConfig,
  getDevServerConfig,
  getStylesConfig
} from '@angular-devkit/build-angular/src/webpack/configs';

import { tags, json } from '@angular-devkit/core';
import {
  I18nOptions,
  loadTranslations
} from '@angular-devkit/build-angular/src/utils/i18n-options';
import { getBuilderOptions } from '../plugins/builder-options';
import { extractBrowserOptions } from '../../src/utils/extract-browser-options';

const transforms = envVariablesPlugin();

export async function overrodeSetup(
  options: DevServerBuilderOptions,
  context: BuilderContext
) {
  const projectName = context.target?.project;
  const { logger, workspaceRoot } = context;

  const browserTarget = targetFromTargetString(options.browserTarget);
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  // Purge old build disk cache.
  await purgeStaleBuildCache(context);

  options.port = await checkPort(
    options.port ?? 4200,
    options.host || 'localhost'
  );

  if (options.hmr) {
    logger.warn(tags.stripIndents`NOTICE: Hot Module Replacement (HMR) is enabled for the dev server.
      See https://webpack.js.org/guides/hot-module-replacement for information on working with HMR for Webpack.`);
  }

  if (
    !options.disableHostCheck &&
    options.host &&
    !/^127\.\d+\.\d+\.\d+/g.test(options.host) &&
    options.host !== 'localhost'
  ) {
    logger.warn(tags.stripIndent`
        Warning: This is a simple server for use in testing or debugging Angular applications
        locally. It hasn't been reviewed for security issues.

        Binding this server to an open connection can result in compromising your application or
        computer. Using a different host than the one passed to the "--host" flag might result in
        websocket connection issues. You might need to use "--disable-host-check" if that's the
        case.
      `);
  }

  if (options.disableHostCheck) {
    logger.warn(tags.oneLine`
        Warning: Running a server with --disable-host-check is a security risk.
        See https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
        for more information.
      `);
  }
  // Get the browser configuration from the target name.
  const rawBrowserOptions = extractBrowserOptions(
    await getBuilderOptions(context, options.browserTarget)
  ) as json.JsonObject & BrowserBuilderOptions;

  if (
    rawBrowserOptions.outputHashing &&
    rawBrowserOptions.outputHashing !== OutputHashing.None
  ) {
    // Disable output hashing for dev build as this can cause memory leaks
    // See: https://github.com/webpack/webpack-dev-server/issues/377#issuecomment-241258405
    rawBrowserOptions.outputHashing = OutputHashing.None;
    logger.warn(
      `Warning: 'outputHashing' option is disabled when using the dev-server.`
    );
  }

  const metadata = await context.getProjectMetadata(projectName);
  const cacheOptions = normalizeCacheOptions(metadata, context.workspaceRoot);

  const browserName = await context.getBuilderNameForTarget(browserTarget);
  const browserOptions = (await context.validateOptions(
    {
      ...rawBrowserOptions,
      watch: options.watch,
      verbose: options.verbose,
      // In dev server we should not have budgets because of extra libs such as socks-js
      budgets: undefined
    } as json.JsonObject & BrowserBuilderOptions,
    browserName
  )) as json.JsonObject & BrowserBuilderOptions;

  const { styles, scripts } = normalizeOptimization(
    browserOptions.optimization
  );
  if (scripts || styles.minify) {
    logger.error(tags.stripIndents`
        ****************************************************************************************
        This is a simple server for use in testing or debugging Angular applications locally.
        It hasn't been reviewed for security issues.

        DON'T USE IT FOR PRODUCTION!
        ****************************************************************************************
      `);
  }

  const { config, projectRoot, i18n } =
    await generateI18nBrowserWebpackConfigFromContext(
      browserOptions,
      context,
      wco => [
        getDevServerConfig(wco),
        getCommonConfig(wco),
        getStylesConfig(wco),
        getAnalyticsConfig(wco, context)
      ],
      options
    );

  if (!config.devServer) {
    throw new Error('Webpack Dev Server configuration was not set.');
  }

  let locale: string | undefined;
  if (i18n.shouldInline) {
    // Dev-server only supports one locale
    locale = [...i18n.inlineLocales][0];
  } else if (i18n.hasDefinedSourceLocale) {
    // use source locale if not localizing
    locale = i18n.sourceLocale;
  }

  let webpackConfig = config;

  // If a locale is defined, setup localization
  if (locale) {
    if (i18n.inlineLocales.size > 1) {
      throw new Error(
        'The development server only supports localizing a single locale per build.'
      );
    }

    await setupLocalize(
      locale,
      i18n,
      browserOptions,
      webpackConfig,
      cacheOptions,
      context
    );
  }

  if (transforms.webpackConfiguration) {
    webpackConfig = await transforms.webpackConfiguration(webpackConfig);
  }

  if (browserOptions.index) {
    const { scripts = [], styles = [], baseHref } = browserOptions;
    const entrypoints = generateEntryPoints({
      scripts,
      styles,
      // The below is needed as otherwise HMR for CSS will break.
      // styles.js and runtime.js needs to be loaded as a non-module scripts as otherwise `document.currentScript` will be null.
      // https://github.com/webpack-contrib/mini-css-extract-plugin/blob/90445dd1d81da0c10b9b0e8a17b417d0651816b8/src/hmr/hotModuleReplacement.js#L39
      isHMREnabled: !!webpackConfig.devServer?.hot
    });

    webpackConfig.plugins ??= [];
    webpackConfig.plugins.push(
      new IndexHtmlWebpackPlugin({
        indexPath: path.resolve(
          workspaceRoot,
          getIndexInputFile(browserOptions.index)
        ),
        outputPath: getIndexOutputFile(browserOptions.index),
        baseHref,
        entrypoints,
        deployUrl: browserOptions.deployUrl,
        sri: browserOptions.subresourceIntegrity,
        cache: cacheOptions,
        postTransform: transforms.indexHtml,
        optimization: normalizeOptimization(browserOptions.optimization),
        crossOrigin: browserOptions.crossOrigin,
        lang: locale
      })
    );
  }

  return {
    browserOptions,
    webpackConfig,
    projectRoot
  };
}

async function setupLocalize(
  locale: string,
  i18n: I18nOptions,
  browserOptions: BrowserBuilderOptions,
  webpackConfig: webpack.Configuration,
  cacheOptions: NormalizedCachedOptions,
  context: BuilderContext
) {
  const localeDescription = i18n.locales[locale];

  // Modify main entrypoint to include locale data
  if (
    localeDescription?.dataPath &&
    typeof webpackConfig.entry === 'object' &&
    !Array.isArray(webpackConfig.entry) &&
    webpackConfig.entry['main']
  ) {
    if (Array.isArray(webpackConfig.entry['main'])) {
      webpackConfig.entry['main'].unshift(localeDescription.dataPath);
    } else {
      webpackConfig.entry['main'] = [
        localeDescription.dataPath,
        webpackConfig.entry['main'] as string
      ];
    }
  }

  let missingTranslationBehavior =
    browserOptions.i18nMissingTranslation || 'ignore';
  let translation = localeDescription?.translation || {};

  if (locale === i18n.sourceLocale) {
    missingTranslationBehavior = 'ignore';
    translation = {};
  }

  const i18nLoaderOptions = {
    locale,
    missingTranslationBehavior,
    translation: i18n.shouldInline ? translation : undefined,
    translationFiles: localeDescription?.files.map(file =>
      path.resolve(context.workspaceRoot, file.path)
    )
  };

  const i18nRule: webpack.RuleSetRule = {
    test: /\.[cm]?[tj]sx?$/,
    enforce: 'post',
    use: [
      {
        loader: require.resolve('../../babel/webpack-loader'),
        options: {
          cacheDirectory:
            (cacheOptions.enabled &&
              path.join(cacheOptions.path, 'babel-dev-server-i18n')) ||
            false,
          cacheIdentifier: JSON.stringify({
            locale,
            translationIntegrity: localeDescription?.files.map(
              file => file.integrity
            )
          }),
          i18n: i18nLoaderOptions
        }
      }
    ]
  };

  // Get the rules and ensure the Webpack configuration is setup properly
  const rules = webpackConfig.module?.rules || [];
  if (!webpackConfig.module) {
    webpackConfig.module = { rules };
  } else if (!webpackConfig.module.rules) {
    webpackConfig.module.rules = rules;
  }

  rules.push(i18nRule);

  // Add a plugin to reload translation files on rebuilds
  const loader = await createTranslationLoader();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  webpackConfig.plugins!.push({
    apply: (compiler: webpack.Compiler) => {
      compiler.hooks.thisCompilation.tap('build-angular', compilation => {
        if (i18n.shouldInline && i18nLoaderOptions.translation === undefined) {
          // Reload translations
          loadTranslations(
            locale,
            localeDescription,
            context.workspaceRoot,
            loader,
            {
              warn(message) {
                addWarning(compilation, message);
              },
              error(message) {
                addError(compilation, message);
              }
            },
            undefined,
            browserOptions.i18nDuplicateTranslation
          );

          i18nLoaderOptions.translation = localeDescription.translation ?? {};
        }

        compilation.hooks.finishModules.tap('build-angular', () => {
          // After loaders are finished, clear out the now unneeded translations
          i18nLoaderOptions.translation = undefined;
        });
      });
    }
  });
}
