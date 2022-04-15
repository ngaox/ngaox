import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { DevServerBuilderOutput } from '@angular-devkit/build-angular';
import { from, Observable, merge, map, switchMap } from 'rxjs';
import * as fs from 'fs-extra';
import { getBuilderOptions } from '../utils/builder-options';
import { getIconsTask, getNgaoxTasks } from './tasks';
import { NgDevServerTask } from './tasks/ng-build';
import { addWebpackPlugin, getNgBuildTransforms } from './plugins';
import {
  IBuilderOptions,
  IWebpackTransforms
} from '../models/builders/builder';

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(
  ngaoxDevServer
);

export function ngaoxDevServer(
  options: DevServerBuilderOptions,
  context: BuilderContext
): Observable<DevServerBuilderOutput | BuilderOutput> {
  return from(getBuilderOptions(context, options.browserTarget)).pipe(
    map(builderOptions => {
      fs.ensureDirSync(builderOptions.outputPath);
      fs.emptyDirSync(builderOptions.outputPath);

      const transforms = getNgBuildTransforms(builderOptions, context);

      return [builderOptions, transforms] as [
        IBuilderOptions,
        IWebpackTransforms
      ];
    }),
    switchMap(([builderOptions, transforms]) =>
      merge(
        getNgaoxTasks(builderOptions, context),
        getIconsTask(builderOptions, context).pipe(
          switchMap(plugin => {
            return NgDevServerTask(
              options,
              builderOptions,
              context,
              addWebpackPlugin(transforms, plugin)
            );
          })
        )
      ).pipe(
        map(() => {
          return {
            success: true
          };
        })
      )
    )
  ) as Observable<DevServerBuilderOutput>;
}
