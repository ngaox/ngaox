import { v6ToV7Observable } from '../../../utils/observable-polyfills';
import { extractBrowserOptions } from '../../../utils/builder-options';
import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';

import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import {
  IBuilderOptions,
  IWebpackTransforms
} from '../../../models/builders/builder';

export { executeDevServerBuilder as NgDevServerTask } from './dev-server';

export function NgBuildTask(
  builderOptions: IBuilderOptions,
  context: BuilderContext,
  transforms: IWebpackTransforms = {}
) {
  const options = extractBrowserOptions(builderOptions);
  return v6ToV7Observable<BuilderOutput>(
    executeBrowserBuilder(options, context, transforms)
  );
}
