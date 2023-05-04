import {
  IBuilderOptions,
  IBuilderTaskOptions,
  IClientSideData,
  IMapperExtraOptions,
  IOptionsObject
} from '../../models/builder';
import { mergeMap, fromEvent, merge, Observable, of, debounceTime } from 'rxjs';
import * as chokidar from 'chokidar';
import { join as joinPaths } from 'path';
import { readFile } from 'fs/promises';
import { BuilderContext } from '@angular-devkit/architect';

export * from './docs.builder';
export * from './contests.builder';
export * from './generic.builder';
export * from './icons.builder';

export function executeContentTask(
  context: BuilderContext,
  options: IOptionsObject & { builder: IBuilderOptions },
  taskName: string,
  value: IBuilderTaskOptions
): Observable<IClientSideData | null> {
  const taskOption = value as IBuilderTaskOptions;
  const directory = joinPaths(context.workspaceRoot, taskOption.dir);
  const watcher = chokidar.watch(joinPaths(directory, taskOption.glob));
  const extraOptions: IMapperExtraOptions = {
    context,
    name: taskName,
    options: taskOption,
    outputPath: options.browser.outputPath,
    baseHref: options.browser.baseHref ?? ''
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
  ).pipe(
    debounceTime(500),
    mergeMap(() =>
      taskOption.builder.getClientSideData === undefined
        ? of(null)
        : taskOption.builder.getClientSideData(extraOptions)
    )
  );
}
