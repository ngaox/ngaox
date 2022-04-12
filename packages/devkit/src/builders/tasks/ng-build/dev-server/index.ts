import { BuilderContext } from '@angular-devkit/architect';
import { runWebpackDevServer } from '@angular-devkit/build-webpack';
import { createWebpackLoggingCallback } from '@angular-devkit/build-angular/src/webpack/utils/stats';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { DevServerBuilderOutput } from '@angular-devkit/build-angular';
import * as url from 'url';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import { tags } from '@angular-devkit/core';
import { from, Observable, concatMap, switchMap } from 'rxjs';
import { overrodeSetup } from './overrode-setup';
import { IBuilderOptions, IWebpackTransforms } from '../../../models/builder';
import { v6ToV7Observable } from '../../../../utils';

export function executeDevServerBuilder(
  options: DevServerBuilderOptions,
  builderOptions: IBuilderOptions,
  context: BuilderContext,
  transforms?: IWebpackTransforms
): Observable<unknown> {
  const logger = context.logger;
  return from(overrodeSetup(options, context, builderOptions, transforms)).pipe(
    switchMap(({ browserOptions, webpackConfig }) => {
      return v6ToV7Observable(
        runWebpackDevServer(webpackConfig, context, {
          logging: createWebpackLoggingCallback(browserOptions, logger),
          webpackFactory: webpack,
          webpackDevServerFactory: webpackDevServer
        })
      ).pipe(
        concatMap(async (buildEvent, index) => {
          // Resolve serve address.
          const publicPath = webpackConfig.devServer?.devMiddleware?.publicPath;

          const serverAddress = url.format({
            protocol: options.ssl ? 'https' : 'http',
            hostname: options.host === '0.0.0.0' ? 'localhost' : options.host,
            port: buildEvent.port,
            pathname: typeof publicPath === 'string' ? publicPath : undefined
          });

          if (index === 0) {
            logger.info(
              '\n' +
                tags.oneLine`
              **
              Angular Live Development Server is listening on ${options.host}:${buildEvent.port},
              open your browser on ${serverAddress}
              **
            ` +
                '\n'
            );

            if (options.open) {
              const open = await import('open');
              await open(serverAddress);
            }
          }

          if (buildEvent.success) {
            logger.info(
              `\n${colors.greenBright(
                colors.symbols.check
              )} Compiled successfully.`
            );
          } else {
            logger.info(
              `\n${colors.redBright(colors.symbols.cross)} Failed to compile.`
            );
          }

          return {
            ...buildEvent,
            baseUrl: serverAddress
          } as DevServerBuilderOutput;
        })
      );
    })
  );
}
