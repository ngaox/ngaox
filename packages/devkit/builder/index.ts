import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { lastValueFrom } from 'rxjs';
import { IBuilderOptions } from '../src';
import * as path from 'path';
import * as deepmerge from 'deepmerge';

import { envVariablesPlugin } from './plugins/env-variables';
import { MdContentTask } from './tasks/md-content';

export default createBuilder(ngaoxBuild);

export async function ngaoxBuild(
  opts: IBuilderOptions,
  context: BuilderContext
): Promise<BuilderOutput> {
  const projectName = context.target && context.target.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  const workspaceRoot = context.workspaceRoot;
  const projectMetadata = await context.getProjectMetadata(projectName);
  const projectRoot = path.join(
    workspaceRoot,
    (projectMetadata.root as string | undefined) ?? ''
  );

  const options: IBuilderOptions = await getBuildOptions(
    opts,
    workspaceRoot,
    projectRoot
  );

  if (options.press) {
    await lastValueFrom(MdContentTask(options.press, context));
  }

  return (await executeBrowserBuilder(
    options.ngBuild,
    context,
    options.allowEnvVariables ? envVariablesPlugin() : undefined
  ).toPromise()) as BuilderOutput;
}

async function getBuildOptions(
  opts: Partial<IBuilderOptions>,
  workspaceRoot: string,
  projectRoot: string
): Promise<IBuilderOptions> {
  let options: IBuilderOptions = {
    ngBuild: opts.ngBuild,
    allowEnvVariables: false
  };

  try {
    options = {
      ...options,
      ...(await import(workspaceRoot + '/ngaox.config.js'))
    };
  } catch (e) {
    /* Dont throw error */
  }

  try {
    options = {
      ...options,
      ...(await import(projectRoot + '/ngaox.config.js'))
    };
  } catch (e) {
    /* Dont throw error */
  }

  return deepmerge(options, JSON.parse(JSON.stringify(opts)));
}
