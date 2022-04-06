import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { DevServerBuilderOutput } from '@angular-devkit/build-angular';
import { from, Observable, switchMap, merge } from 'rxjs';
import * as fs from 'fs-extra';
import { getBuilderOptions } from '../src/utils';
import { getNgaoxTasks } from './tasks';
import { NgDevServerTask } from './tasks/ng-build';
import { getNgBuildTransforms } from './plugins';

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(
  ngaoxDevServer
);

export function ngaoxDevServer(
  options: DevServerBuilderOptions,
  context: BuilderContext
): Observable<DevServerBuilderOutput | BuilderOutput> {
  return from(getBuilderOptions(context, options.browserTarget)).pipe(
    switchMap(builderOptions => {
      const transforms = getNgBuildTransforms(builderOptions);

      fs.ensureDirSync(builderOptions.outputPath);
      fs.emptyDirSync(builderOptions.outputPath);

      return merge(
        ...getNgaoxTasks(builderOptions, context),
        NgDevServerTask(options, builderOptions, context, transforms)
      );
    })
  ) as Observable<DevServerBuilderOutput>;
}
