import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { DevServerBuilderOutput } from '@angular-devkit/build-angular';
import { from, Observable, merge, map, switchMap } from 'rxjs';
import * as fs from 'fs-extra';
import { getIconsTask, getNgaoxTasks } from './tasks';
import { addWebpackPlugin, getNgBuildTransforms } from './plugins';
import { IOptionsObject, IWebpackTransforms } from '../models/builders/builder';
import { NgDevServerTask } from './tasks/ng-build';
import { getOptions } from '../utils/builders/options';

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(
  ngaoxDevServer
);

export function ngaoxDevServer(
  devServerOptions: DevServerBuilderOptions,
  context: BuilderContext
): Observable<DevServerBuilderOutput> {
  return from(getOptions(context, devServerOptions.browserTarget ?? '')).pipe(
    map(options => {
      fs.ensureDirSync(options.builder.outputPath);
      fs.emptyDirSync(options.builder.outputPath);

      const transforms = getNgBuildTransforms(options.builder, context);

      return [options, transforms] as [IOptionsObject, IWebpackTransforms];
    }),
    switchMap(([options, transforms]) =>
      merge(
        getNgaoxTasks(options.builder, context),
        getIconsTask(options.builder, context).pipe(
          switchMap(plugin => {
            return NgDevServerTask(
              devServerOptions,
              options,
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
