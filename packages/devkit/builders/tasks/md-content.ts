import { BuilderContext } from '@angular-devkit/architect';

import * as path from 'path';
import * as chokidar from 'chokidar';
import * as matter from 'gray-matter';
import * as fs from 'fs-extra';

import { marked } from 'marked';
import { JSDOM } from 'jsdom';

import * as Prism from 'prismjs';
import { IPressOptions, ITocLink } from '../../src';
import { fromEvent } from 'rxjs';
import { colors } from '@angular-devkit/build-angular/src/utils/color';

export function MdContentTask(opts: IPressOptions, context: BuilderContext) {
  const contentPath = path.join(context.workspaceRoot, opts.content);
  const watcher = chokidar.watch(contentPath);
  watcher
    .on('add', async (path: string) => {
      const jsonFilePath = await parseFile(path);
      context.logger.info(
        `${colors.greenBright(colors.symbols.check)} Generated: ${jsonFilePath}`
      );
    })
    .on('change', async (path: string) => {
      const jsonFilePath = await parseFile(path);
      context.logger.info(
        `${colors.greenBright(colors.symbols.check)} Updated: ${jsonFilePath}`
      );
    })
    .on('unlink', (path: string) => {
      const jsonFilePath = getOutPath(path);
      fs.unlinkSync(jsonFilePath);
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

async function parseFile(filePath: string) {
  const outFile = getOutPath(filePath);
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
  return outFile;
}

function getOutPath(path: string): string {
  const index = path.lastIndexOf('.');
  const htmlFileName = path.substring(0, index) + '.json';
  return htmlFileName;
}
