import { BuilderContext } from '@angular-devkit/architect';
import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  finalize,
  fromEvent,
  tap
} from 'rxjs';

import * as path from 'path';
import * as chokidar from 'chokidar';
import * as matter from 'gray-matter';
import * as fs from 'fs-extra';

import { marked } from 'marked';
import { JSDOM } from 'jsdom';

import * as Prism from 'prismjs';
import { getCleanRelative } from '../../utils/generators-options';
import { IPressMapper, IPressOptions } from '../../models/builders/press';
import { IParsedContent, ITocLink } from '../../models/mappers/generic';
import { getGenericMapper } from '../../mappers/generic.mapper';
import { CONTENT_DIR } from '../../models/constants';
import { logSuccess } from '../../utils/output';

export function MdContentTask(
  opts: IPressOptions,
  context: BuilderContext,
  outputPath: string
) {
  const contentPath = path.join(context.workspaceRoot, opts.dir, opts.content);
  const mapper = (opts?.mapper ?? getGenericMapper()) as IPressMapper;
  const mapperExtraOpts = {
    context,
    options: opts,
    outputPath: path.join(outputPath, CONTENT_DIR)
  };

  const watcher = chokidar.watch(contentPath);
  const pressChanged$ = new BehaviorSubject(null);
  let isWatcherReady = false;

  const buildFile = async (filePath: string) => {
    const parsed = await parseFile(filePath);
    filePath = getCleanRelative(
      filePath,
      path.join(context.workspaceRoot, opts.dir)
    );
    await mapper.push(parsed, filePath, mapperExtraOpts);
    if (isWatcherReady) {
      pressChanged$.next(null);
    }
  };

  watcher
    .on('add', buildFile)
    .on('change', buildFile)
    .on('unlink', async (filePath: string) => {
      filePath = getCleanRelative(
        filePath,
        path.join(context.workspaceRoot, opts.dir)
      );
      await mapper.remove(filePath, mapperExtraOpts);
      if (isWatcherReady) {
        pressChanged$.next(null);
      }
    });

  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });

  return fromEvent(watcher, 'ready').pipe(
    concatMap(() => {
      isWatcherReady = true;
      return pressChanged$.pipe(debounceTime(2000));
    }),
    tap(() => {
      logSuccess(context.logger, 'Press content compiled successfully.');
    }),
    finalize(() => {
      watcher.close();
    })
  );
}

async function parseFile(filePath: string): Promise<IParsedContent> {
  const content = await fs.readFile(filePath, 'utf8');
  const TOC: ITocLink[] = [];
  const { data, content: markdown } = matter(content);

  const markedRenderer = new marked.Renderer();
  markedRenderer.heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const id = text
      .toLowerCase()
      .trim()
      // remove unwanted chars
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        ''
      )
      .replace(/\s/g, '-');
    TOC.push({
      title: text,
      id,
      level: `h${level}`
    });
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  const html = new JSDOM(
    marked(markdown, {
      renderer: markedRenderer
    })
  ).window.document.body;
  Prism.highlightAllUnder(html);

  return { data, content: html.innerHTML, toc: TOC };
}
