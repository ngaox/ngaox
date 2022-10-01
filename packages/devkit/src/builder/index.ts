import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { setupAndGetOptions } from './helpers/prepare';
import {
  mergeMap,
  from,
  fromEvent,
  merge,
  map,
  catchError,
  of,
  switchMap
} from 'rxjs';
import {
  IBrowserBuilderOptions,
  IBuilderTaskOptions,
  IMapperExtraOptions
} from '../models/builder';
import * as chokidar from 'chokidar';
import { join as joinPaths } from 'path';
import { readFile } from 'fs/promises';

export default createBuilder(
  (builderOptions: IBrowserBuilderOptions, context: BuilderContext) => {
    const options$ = from(setupAndGetOptions(context, builderOptions));
    return options$.pipe(
      switchMap(options => {
        return merge(
          ...Object.values(options.builder.content).map(value => {
            const taskOption = value as IBuilderTaskOptions;
            const directory = joinPaths(context.workspaceRoot, taskOption.dir);
            const watcher = chokidar.watch(
              joinPaths(directory, taskOption.glob)
            );
            const extraOptions: IMapperExtraOptions = {
              context,
              options: taskOption,
              outputPath: options.browser.outputPath
            };
            extraOptions.options.dir = directory;
            const compileFiles = async ([filePath]: [string]) => {
              return taskOption.builder.push(
                taskOption.parser(await readFile(filePath, 'utf8')),
                filePath,
                extraOptions
              );
            };
            return merge(
              fromEvent(watcher, 'add').pipe(mergeMap(compileFiles)),
              fromEvent(watcher, 'change').pipe(mergeMap(compileFiles)),
              fromEvent(watcher, 'unlink').pipe(
                mergeMap((filePath: string) =>
                  taskOption.builder.remove(filePath, extraOptions)
                )
              )
            );
          })
        ).pipe(map(() => ({ success: true })));
      }),
      catchError(error => {
        context.logger.error(error.message ?? error.stack ?? error);
        return of({ success: false });
      })
    );
  }
);
