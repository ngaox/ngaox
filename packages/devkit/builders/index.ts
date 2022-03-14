import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import {
  executeBrowserBuilder,
  BrowserBuilderOptions
} from '@angular-devkit/build-angular';
import { IBuilderOptions } from '../src';

import { envVariablesPlugin } from './plugins/env-variables';
import { MdContentTask } from './tasks/md-content';
import { getBuilderOptions } from './plugins/builder-options';
import { first, lastValueFrom } from 'rxjs';

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

  if (options.press) {
    await lastValueFrom(MdContentTask(options.press, context).pipe(first()));
    context.logger.info('');
  }

  return (await executeBrowserBuilder(
    options.ngBuild as BrowserBuilderOptions,
    context,
    options.allowEnvVariables ? envVariablesPlugin() : undefined
  ).toPromise()) as BuilderOutput;
}
