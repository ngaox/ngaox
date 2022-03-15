import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { IBuilderOptions } from '../src';

import { envVariablesPlugin } from './plugins/env-variables';
import { MdContentTask } from './tasks/md-content';
import { getBuilderOptions } from './plugins/builder-options';
import { first, lastValueFrom } from 'rxjs';
import { extractBrowserOptions } from '../src/utils/extract-browser-options';
import * as fs from 'fs-extra';

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

  if (options.press) {
    await lastValueFrom(
      MdContentTask(options.press, context, options.outputPath).pipe(first())
    );
  }

  return (await executeBrowserBuilder(
    extractBrowserOptions(options),
    context,
    options.allowEnvVariables ? envVariablesPlugin() : undefined
  ).toPromise()) as BuilderOutput;
}
