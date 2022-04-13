import { BuilderContext } from '@angular-devkit/architect';
import { ISvgIconsOptions } from '../../models/builders/icons';
import { writeFile } from '../../utils/filesystem';
import { cleanPath, getCleanRelative } from '../../utils/generators-options';
import { fromEvent, map } from 'rxjs';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as chokidar from 'chokidar';
import { optimize } from 'svgo';
import { INgaoxIcon } from '../../models/builders/icons';

export const ICONS_DIR = '~icons';

const memory: {
  [filePath: string]: INgaoxIcon;
} = {};

export function svgIconsPlugin(
  options: ISvgIconsOptions,
  context: BuilderContext,
  outputPath: string
) {
  const directory = path.join(context.workspaceRoot, options.dir);
  const watcher = chokidar.watch(path.join(directory, '**/*.svg'));

  const compileSvgFile = async (filePath: string) => {
    filePath = getCleanRelative(filePath, directory);
    const result = optimize(
      await fs.readFile(path.join(directory, filePath), 'utf8'),
      options.svgoConfig
    );
    const slug = cleanPath(filePath.replace(/\.svg$/, ''));
    const url = cleanPath(path.join(ICONS_DIR, filePath));
    if (result.error) {
      // TODO: handle this case
      return;
    }
    await writeFile(url, result['data'], {
      dir: outputPath,
      logger: context.logger
    });
    memory[url] = {
      name: `${
        options.namespace ? `${options.namespace ?? ''}:` : ''
      }${slug.replace(/\//g, ':')}`,
      data: {
        url,
        lazy: true
      }
    };
  };

  watcher
    .on('add', compileSvgFile)
    .on('change', compileSvgFile)
    .on('unlink', (filePath: string) => {
      filePath = getCleanRelative(filePath, directory);
      const url = cleanPath(path.join(ICONS_DIR, filePath));
      delete memory[url];
    });

  return fromEvent(watcher, 'ready').pipe(map(() => Object.values(memory)));
}
