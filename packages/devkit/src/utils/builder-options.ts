import { BuilderContext } from '@angular-devkit/architect';

import { targetFromTargetString } from '@angular-devkit/architect';
import {
  InlineStyleLanguage,
  OutputHashing
} from '@angular-devkit/build-angular/src/builders/browser/schema';
import { Type as BudgetType } from '@angular-devkit/build-angular';
import * as deepmerge from 'deepmerge';
import * as path from 'path';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { IBuilderOptions } from '../builders/models/builder';
import { pressOutputFolder } from '../../press/constants';
import { cleanPath } from './generators-options';

export function extractBrowserOptions(
  options: IBuilderOptions
): BrowserBuilderOptions {
  return {
    ...options.ngBuild,
    watch: options?.watch,
    outputPath: options.outputPath,
    deleteOutputPath: false
  } as BrowserBuilderOptions;
}

export function getOutputtedAssets(options: IBuilderOptions) {
  const assets = [];
  if (options.press) {
    assets.push({
      glob: '**/*',
      input: path.join(options.outputPath, pressOutputFolder),
      output: pressOutputFolder
    });
  }
  return assets;
}

export async function getBuilderOptions(
  context: BuilderContext,
  extra: string | IBuilderOptions
): Promise<IBuilderOptions> {
  const overridesOpts =
    typeof extra === 'string'
      ? await context.getTargetOptions(targetFromTargetString(extra))
      : extra;
  const projectName = context.target && context.target.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }
  const workspaceRoot = context.workspaceRoot;
  const projectMetadata = await context.getProjectMetadata(projectName);
  const projectRoot = cleanPath(
    (projectMetadata.root as string | undefined) ?? ''
  );
  const sourceRoot = cleanPath(
    (projectMetadata.sourceRoot as string | undefined) ?? ''
  );
  let isOutputted = false;
  let options: Partial<IBuilderOptions> = {
    outputPath: `dist/${projectRoot}`,
    ngBuild: {
      index: `${sourceRoot}/index.html`,
      main: `${sourceRoot}/main.ts`,
      polyfills: `${sourceRoot}/polyfills.ts`,
      tsConfig: `${projectRoot}/tsconfig.app.json`,
      inlineStyleLanguage: InlineStyleLanguage.Css,
      assets: []
    },
    allowEnvVariables: false,
    configurations: {
      development: {
        ngBuild: {
          buildOptimizer: false,
          optimization: false,
          vendorChunk: true,
          extractLicenses: false,
          sourceMap: true,
          namedChunks: true
        }
      },
      production: {
        ngBuild: {
          budgets: [
            {
              type: BudgetType.Initial,
              maximumWarning: '500kb',
              maximumError: '1mb'
            },
            {
              type: BudgetType.AnyComponentStyle,
              maximumWarning: '2kb',
              maximumError: '4kb'
            }
          ],
          fileReplacements: [
            {
              replace: `${sourceRoot}/environments/environment.ts`,
              with: `${sourceRoot}/environments/environment.prod.ts`
            }
          ],
          outputHashing: OutputHashing.All
        }
      }
    }
  };

  try {
    const workspaceConfigPath = path.join(workspaceRoot, 'ngaox.config.js');
    options = deepmerge(options, await import(workspaceConfigPath));
    isOutputted = true;
    context.logger.info(
      `${colors.blueBright(
        colors.symbols.pointer
      )} Found workspace config from: ${workspaceConfigPath}`
    );
  } catch (e) {
    /* Dont throw error */
  }

  try {
    const projectConfigPath = path.join(
      workspaceRoot,
      overridesOpts['config-dir'] ?? projectRoot,
      'ngaox.config.js'
    );

    options = deepmerge(options, await import(projectConfigPath));
    isOutputted = true;
    context.logger.info(
      `${colors.blueBright(
        colors.symbols.pointer
      )} Found project config from: ${projectConfigPath}`
    );
  } catch (e) {
    /* Dont throw error */
  }

  if (isOutputted) context.logger.info(``);

  const mergedOptions = deepmerge(
    options,
    JSON.parse(JSON.stringify(overridesOpts))
  );

  return {
    ...deepmerge(
      mergedOptions,
      mergedOptions.configurations[mergedOptions.config] ?? {}
    ),
    configurations: undefined
  };
}
