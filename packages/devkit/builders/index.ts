import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { IBuilderOptions } from '../src';

import {
  getBuilderOptions,
  extractBrowserOptions
} from '../src/utils/builder-options';
import { first, forkJoin, lastValueFrom } from 'rxjs';
import * as fs from 'fs-extra';
import { getNgaoxTasks } from './tasks';
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

  const options: IBuilderOptions = await getBuilderOptions(context, opts, true);

  await fs.ensureDir(options.outputPath);
  await fs.emptyDir(options.outputPath);

  await lastValueFrom(
    forkJoin(
      getNgaoxTasks(options, context).map(ob$ => ob$.pipe(first()))
    ).pipe(first())
  );

  return (await executeBrowserBuilder(
    extractBrowserOptions(options),
    context,
    getNgBuildTransforms(options)
  ).toPromise()) as BuilderOutput;
}
