import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { IBuilderOptions } from '../models/builders/builder';

import { getBuilderOptions } from '../utils/builder-options';
import { first, firstValueFrom, forkJoin } from 'rxjs';
import * as fs from 'fs-extra';
import { getIconsTask, getNgaoxTasks } from './tasks';
import { NgBuildTask } from './tasks/ng-build';
import { addWebpackPlugin, getNgBuildTransforms } from './plugins';

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

  await firstValueFrom(
    forkJoin(getNgaoxTasks(options, context).map(ob$ => ob$.pipe(first())))
  );

  const plugin = await firstValueFrom(getIconsTask(options, context));

  const transforms = addWebpackPlugin(
    getNgBuildTransforms(options, context),
    plugin
  );

  return (await firstValueFrom(
    NgBuildTask(options, context, transforms).pipe(first())
  )) as BuilderOutput;
}
