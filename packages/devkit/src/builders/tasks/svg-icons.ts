import { BuilderContext } from '@angular-devkit/architect';
import { ISvgIconsOptions } from '../../models/builders/icons';
import { writeFile } from '../../utils/filesystem';
import { cleanPath, getCleanRelative } from '../../utils/generators-options';
import {
  BehaviorSubject,
  finalize,
  fromEvent,
  map,
  concatMap,
  tap,
  skip,
  debounceTime
} from 'rxjs';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as chokidar from 'chokidar';
import { optimize } from 'svgo';
import { INgaoxIcon } from '../../models/builders/icons';
import { ICONS_DIR } from '../../models/constants';
import { logSuccess } from '../../utils/output';

const memory: {
  [filePath: string]: INgaoxIcon;
} = {};

export function svgIconsTask(
  options: ISvgIconsOptions,
  context: BuilderContext,
  outputPath: string
) {
  const directory = path.join(context.workspaceRoot, options.dir);
  const watcher = chokidar.watch(path.join(directory, '**/*.svg'));
  const iconsChanged$ = new BehaviorSubject(null);
  let isWatcherReady = false;

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
    await writeFile(url, result['data'], outputPath);
    memory[url] = {
      name: `${
        options.namespace ? `${options.namespace ?? ''}:` : ''
      }${slug.replace(/\//g, ':')}`,
      data: {
        url,
        lazy: true
      }
    };
    if (isWatcherReady) {
      iconsChanged$.next(null);
    }
  };

  watcher
    .on('add', compileSvgFile)
    .on('change', compileSvgFile)
    .on('unlink', (filePath: string) => {
      filePath = getCleanRelative(filePath, directory);
      const url = cleanPath(path.join(ICONS_DIR, filePath));
      delete memory[url];
      if (isWatcherReady) {
        iconsChanged$.next(null);
      }
    });

  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });

  return fromEvent(watcher, 'ready').pipe(
    concatMap(() => {
      isWatcherReady = true;
      return iconsChanged$.pipe(
        skip(1),
        debounceTime(2000),
        map(() => Object.values(memory))
      );
    }),
    tap(icons => {
      logSuccess(
        context.logger,
        `SVG Icons compiled successfully (Total ${icons.length})`
      );
    }),
    finalize(() => {
      watcher.close();
    })
  );
}
