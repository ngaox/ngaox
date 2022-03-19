import { BuilderContext } from '@angular-devkit/architect';

import * as path from 'path';
import * as chokidar from 'chokidar';
import * as matter from 'gray-matter';
import * as fs from 'fs-extra';

import { marked } from 'marked';
import { JSDOM } from 'jsdom';

import * as Prism from 'prismjs';
import {
  clearCurrentLine,
  getCleanRelative,
  IPressMapper,
  IPressOptions
} from '../../src';
import {
  IParsedContent,
  ITocLink,
  CONTENT_MAP_FILENAME,
  CONTENT_OUTPUT_DIR
} from '@ngaox/press';
import { fromEvent } from 'rxjs';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import { cleanPath, genericPressMapper } from '../../src';

const greenCheckSymbol = colors.greenBright(colors.symbols.check);

export function MdContentTask(
  opts: IPressOptions,
  context: BuilderContext,
  outputPath: string
) {
  const contentMapPath = path.join(
    context.workspaceRoot,
    outputPath,
    CONTENT_OUTPUT_DIR,
    CONTENT_MAP_FILENAME
  );
  const contentPath = path.join(context.workspaceRoot, opts.dir, opts.content);
  const mapper = (
    opts.mapper !== false
      ? opts.mapper ?? genericPressMapper
      : genericPressMapper
  ) as IPressMapper<any, any>;
  const createContentMap = opts.mapper !== false;

  const watcher = chokidar.watch(contentPath);
  let contentMap = mapper.empty;

  const buildFile = async (filePath: string) => {
    const rawParsed = await parseFile(filePath);
    filePath = getCleanRelative(
      filePath,
      path.join(context.workspaceRoot, opts.dir)
    );
    const [outputFilePath, parsed] = mapper.mapValues(
      contentMap,
      filePath,
      rawParsed
    );
    const outFile = path.join(outputPath, CONTENT_OUTPUT_DIR, outputFilePath);
    await fs.ensureDir(path.dirname(outFile));
    await fs.writeJSON(outFile, parsed);

    if (createContentMap) {
      contentMap = mapper.push(contentMap, cleanPath(filePath), parsed);
      await fs.writeJSON(contentMapPath, contentMap);
    }
    return outputFilePath;
  };

  watcher
    .on('add', async (filePath: string) => {
      const outputFilePath = await buildFile(filePath);
      clearCurrentLine();
      context.logger.info(`${greenCheckSymbol} Generated: ${outputFilePath}`);
    })
    .on('change', async (filePath: string) => {
      const outputFilePath = await buildFile(filePath);
      clearCurrentLine();
      context.logger.info(`${greenCheckSymbol} Updated: ${outputFilePath}`);
    })
    .on('unlink', async (filePath: string) => {
      let jsonFilePath: string;
      filePath = getCleanRelative(
        filePath,
        path.join(context.workspaceRoot, opts.dir)
      );
      [contentMap, jsonFilePath] = mapper.remove(contentMap, filePath);
      await fs.unlink(path.join(outputPath, CONTENT_OUTPUT_DIR, jsonFilePath));
      if (createContentMap) {
        await fs.writeJSON(contentMapPath, contentMap);
      }
      clearCurrentLine();
      context.logger.info(`${greenCheckSymbol} Removed: ${jsonFilePath}`);
    });

  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });

  return fromEvent(watcher, 'ready');
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
