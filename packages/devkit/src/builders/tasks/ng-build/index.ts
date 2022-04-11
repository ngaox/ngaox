import { extractBrowserOptions, v6ToV7Observable } from '../../../utils';
import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';

import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { IBuilderOptions } from '../../models/builder';

export { executeDevServerBuilder as NgDevServerTask } from './dev-server';

export function NgBuildTask(
  builderOptions: IBuilderOptions,
  context: BuilderContext,
  transforms?: unknown
) {
  const options = extractBrowserOptions(builderOptions);
  return v6ToV7Observable<BuilderOutput>(
    executeBrowserBuilder(options, context, transforms)
  );
}
