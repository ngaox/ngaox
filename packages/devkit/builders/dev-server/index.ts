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
import {
  from,
  Observable,
  concatMap,
  switchMap,
  fromEvent,
  merge,
  map,
  BehaviorSubject,
  filter
} from 'rxjs';
import { overrodeSetup } from './overrode-setup';
import { EventEmitter } from 'events';
import { MdContentTask } from '../tasks/md-content';
import { IPressOptions } from '../../src/modals';
import { getBuilderOptions } from '../plugins/builder-options';

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(
  ngaoxDevServer
);

export function ngaoxDevServer(
  options: DevServerBuilderOptions,
  context: BuilderContext
): Observable<DevServerBuilderOutput | BuilderOutput> {
  const contentIsReady$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  const logger = context.logger;
  return merge(
    from(getBuilderOptions(context, options.browserTarget, true)).pipe(
      switchMap(builderOptions => {
        return MdContentTask(
          builderOptions.press as IPressOptions,
          context
        ).pipe(
          map(() => {
            if (!contentIsReady$.value) {
              contentIsReady$.next(true);
            }
            return {
              success: true
            };
          })
        );
      })
    ),
    contentIsReady$
      .pipe(
        filter(contentIsReady => contentIsReady),
        switchMap(() => from(overrodeSetup(options, context)))
      )
      .pipe(
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
  ) as Observable<DevServerBuilderOutput>;
}
