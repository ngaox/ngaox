import { BuilderContext } from '@angular-devkit/architect';

import * as path from 'path';
import * as chokidar from 'chokidar';
import * as matter from 'gray-matter';
import * as fs from 'fs-extra';

import { marked } from 'marked';
import { JSDOM } from 'jsdom';

import * as Prism from 'prismjs';
import {
  CONTENT_MAP_FILENAME,
  CONTENT_OUTPUT_DIR,
  IPressOptions,
  ITocLink
} from '../../src';
import { fromEvent } from 'rxjs';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import { cleanPath, genericPressMapper } from '../../src';

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
  const mapper =
    opts.mapper !== false ? opts.mapper ?? genericPressMapper : undefined;

  const watcher = chokidar.watch(contentPath);
  let contentMap = [];

  const buildFile = async (filePath: string) => {
    const outputFilePath = getOutPath(
      filePath,
      path.join(context.workspaceRoot, opts.dir)
    );
    const metadata = await parseFile(
      filePath,
      path.join(outputPath, CONTENT_OUTPUT_DIR, outputFilePath)
    );

    if (mapper !== undefined) {
      contentMap = mapper.push(contentMap, outputFilePath, metadata);
      await fs.writeJSON(contentMapPath, contentMap);
    }
    return outputFilePath;
  };

  watcher
    .on('add', async (filePath: string) => {
      const outputFilePath = await buildFile(filePath);
      process.stdout.clearLine(0); // clear current text
      process.stdout.cursorTo(0); // move cursor to beginning of line
      context.logger.info(
        `${colors.greenBright(
          colors.symbols.check
        )} Generated: ${outputFilePath}`
      );
    })
    .on('change', async (filePath: string) => {
      const outputFilePath = await buildFile(filePath);
      process.stdout.clearLine(0); // clear current text
      process.stdout.cursorTo(0); // move cursor to beginning of line
      context.logger.info(
        `${colors.greenBright(colors.symbols.check)} Updated: ${outputFilePath}`
      );
    })
    .on('unlink', async (filePath: string) => {
      const jsonFilePath = getOutPath(
        filePath,
        path.join(context.workspaceRoot, opts.dir)
      );
      await fs.unlink(jsonFilePath);
      if (mapper !== undefined) {
        contentMap = mapper.remove(contentMap, jsonFilePath);
        await fs.writeJSON(contentMapPath, contentMap);
      }
      process.stdout.clearLine(0); // clear current text
      process.stdout.cursorTo(0); // move cursor to beginning of line
      context.logger.info(
        `${colors.greenBright(colors.symbols.check)} Removed: ${jsonFilePath}`
      );
    });

  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });

  return fromEvent(watcher, 'ready');
}

async function parseFile(filePath: string, outFile: string) {
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

  await fs.ensureDir(path.dirname(outFile));
  await fs.writeJSON(outFile, { data, content: html.innerHTML, toc: TOC });
  return data;
}

function getOutPath(filePath: string, dir: string): string {
  filePath = cleanPath(path.relative(dir, filePath));
  const index = filePath.lastIndexOf('.');
  const htmlFileName = filePath.substring(0, index) + '.json';
  return htmlFileName;
}
