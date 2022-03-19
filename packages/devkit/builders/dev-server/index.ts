import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { runWebpackDevServer } from '@angular-devkit/build-webpack';
import { createWebpackLoggingCallback } from '@angular-devkit/build-angular/src/webpack/utils/stats';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { DevServerBuilderOutput } from '@angular-devkit/build-angular';
import * as url from 'url';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import { tags } from '@angular-devkit/core';
import { from, Observable, concatMap, switchMap, fromEvent, merge } from 'rxjs';
import { overrodeSetup } from './overrode-setup';
import { EventEmitter } from 'events';
import { getBuilderOptions } from '../../src/utils/builder-options';
import * as fs from 'fs-extra';
import { getNgaoxTasks } from '../tasks';

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(
  ngaoxDevServer
);

export function ngaoxDevServer(
  options: DevServerBuilderOptions,
  context: BuilderContext
): Observable<DevServerBuilderOutput | BuilderOutput> {
  const logger = context.logger;
  return from(getBuilderOptions(context, options.browserTarget, true)).pipe(
    switchMap(builderOptions => {
      fs.ensureDirSync(builderOptions.outputPath);
      fs.emptyDirSync(builderOptions.outputPath);

      return merge(
        ...getNgaoxTasks(builderOptions, context),
        from(overrodeSetup(options, context, builderOptions)).pipe(
          switchMap(({ browserOptions, webpackConfig }) => {
            const buildEventEmitter = new EventEmitter();
            runWebpackDevServer(webpackConfig, context, {
              logging: createWebpackLoggingCallback(browserOptions, logger),
              webpackFactory: webpack,
              webpackDevServerFactory: webpackDevServer
            }).subscribe({
              next: (buildEvent: any) => {
                buildEventEmitter.emit('build', buildEvent);
              }
            });
            return fromEvent(buildEventEmitter, 'build').pipe(
              concatMap(async (buildEvent: any, index) => {
                // Resolve serve address.
                const publicPath =
                  webpackConfig.devServer?.devMiddleware?.publicPath;

                const serverAddress = url.format({
                  protocol: options.ssl ? 'https' : 'http',
                  hostname:
                    options.host === '0.0.0.0' ? 'localhost' : options.host,
                  port: buildEvent.port,
                  pathname:
                    typeof publicPath === 'string' ? publicPath : undefined
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
                    `\n${colors.redBright(
                      colors.symbols.cross
                    )} Failed to compile.`
                  );
                }

                return {
                  ...buildEvent,
                  baseUrl: serverAddress
                } as DevServerBuilderOutput;
              })
            );
          })
        )
      );
    })
  ) as Observable<DevServerBuilderOutput>;
}
