import { IBuilderOptions } from '../../models/builders/builder';
import { CONTENT_DIR, ICONS_DIR } from '../../models/constants';
import * as path from 'path';

export function getOutputtedAssets(options: IBuilderOptions) {
  const assets = [];
  if (options.press) {
    assets.push({
      glob: '**/*',
      input: path.join(options.outputPath, CONTENT_DIR),
      output: CONTENT_DIR
    });
  }
  if (options.icons) {
    assets.push({
      glob: '**/*',
      input: path.join(options.outputPath, ICONS_DIR),
      output: ICONS_DIR
    });
  }
  return assets;
}
