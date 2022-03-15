import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { IBuilderOptions } from '../modals';

export function extractBrowserOptions(
  options: IBuilderOptions
): BrowserBuilderOptions {
  return {
    ...options.ngBuild,
    watch: options?.watch,
    outputPath: options.outputPath
  } as BrowserBuilderOptions;
}
