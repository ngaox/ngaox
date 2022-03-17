import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import * as path from 'path';
import { CONTENT_OUTPUT_DIR } from '..';
import { IBuilderOptions } from '../index';

export function extractBrowserOptions(
  options: IBuilderOptions
): BrowserBuilderOptions {
  return {
    ...options.ngBuild,
    watch: options?.watch,
    outputPath: options.outputPath,
    deleteOutputPath: false
  } as BrowserBuilderOptions;
}

export function getOutputtedAssets(options: IBuilderOptions) {
  return [
    {
      glob: '**/*',
      input: path.join(options.outputPath, CONTENT_OUTPUT_DIR),
      output: CONTENT_OUTPUT_DIR
    }
  ];
}
