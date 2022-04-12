import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { IBuilderOptions } from './models/builder';

import { getBuilderOptions } from '../utils';
import { first, forkJoin, lastValueFrom, switchMap } from 'rxjs';
import * as fs from 'fs-extra';
import { getNgaoxTasks } from './tasks';
import { NgBuildTask } from './tasks/ng-build';
import { getNgBuildTransforms } from './plugins';

export default createBuilder(ngaoxBuild);

export async function ngaoxBuild(
  opts: IBuilderOptions,
  context: BuilderContext
): Promise<BuilderOutput> {
  const projectName = context.target && context.target.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }
  const options: IBuilderOptions = await getBuilderOptions(context, opts);

  await fs.ensureDir(options.outputPath);
  await fs.emptyDir(options.outputPath);

  return (await lastValueFrom(
    forkJoin([
      ...getNgaoxTasks(options, context).map(ob$ => ob$.pipe(first())),
      getNgBuildTransforms(options, context).pipe(
        first(),
        switchMap(transforms => NgBuildTask(options, context, transforms))
      )
    ]).pipe(first())
  )) as BuilderOutput;
}
