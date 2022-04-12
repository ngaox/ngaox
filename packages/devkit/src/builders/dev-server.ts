import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { DevServerBuilderOutput } from '@angular-devkit/build-angular';
import { from, Observable, switchMap, merge, mergeMap, map } from 'rxjs';
import * as fs from 'fs-extra';
import { getBuilderOptions } from '../utils';
import { getNgaoxTasks } from './tasks';
import { NgDevServerTask } from './tasks/ng-build';
import { getNgBuildTransforms } from './plugins';
import { IBuilderOptions, IWebpackTransforms } from './models/builder';

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(
  ngaoxDevServer
);

export function ngaoxDevServer(
  options: DevServerBuilderOptions,
  context: BuilderContext
): Observable<DevServerBuilderOutput | BuilderOutput> {
  return from(getBuilderOptions(context, options.browserTarget)).pipe(
    mergeMap(builderOptions => {
      fs.ensureDirSync(builderOptions.outputPath);
      fs.emptyDirSync(builderOptions.outputPath);

      return getNgBuildTransforms(builderOptions, context).pipe(
        map(transforms => [builderOptions, transforms])
      );
    }),
    switchMap(
      ([builderOptions, transforms]: [IBuilderOptions, IWebpackTransforms]) => {
        return merge(
          ...getNgaoxTasks(builderOptions, context),
          NgDevServerTask(options, builderOptions, context, transforms)
        );
      }
    )
  ) as Observable<DevServerBuilderOutput>;
}
