import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { IBrowserBuilderOptions } from '../models/builders/builder';

import { first, firstValueFrom, forkJoin } from 'rxjs';
import * as fs from 'fs-extra';
import { getIconsTask, getNgaoxTasks } from './tasks';
import { NgBuildTask } from './tasks/ng-build';
import { addWebpackPlugin, getNgBuildTransforms } from './plugins';
import { getOptions } from '../utils/builders/options';

export default createBuilder(ngaoxBuild);

export async function ngaoxBuild(
  ngBuildOptions: IBrowserBuilderOptions,
  context: BuilderContext
): Promise<BuilderOutput> {
  const { builder: options, browser: browserOptions } = await getOptions(
    context,
    ngBuildOptions
  );

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
    NgBuildTask(browserOptions, context, transforms).pipe(first())
  )) as BuilderOutput;
}
