import { v6ToV7Observable } from '../../../utils/observable-polyfills';
import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';

import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import {
  IBrowserBuilderOptions,
  IWebpackTransforms
} from '../../../models/builders/builder';

export { executeDevServerBuilder as NgDevServerTask } from './dev-server';

export function NgBuildTask(
  options: IBrowserBuilderOptions,
  context: BuilderContext,
  transforms: IWebpackTransforms = {}
) {
  return v6ToV7Observable<BuilderOutput>(
    executeBrowserBuilder(options, context, transforms)
  );
}
