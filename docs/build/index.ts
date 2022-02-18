import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import chokidar from 'chokidar';
import matter from 'gray-matter';
import marked = require('marked');
import { JSDOM } from 'jsdom';
import { DOCS_SECTIONS, SortItemsCallback } from '@docs-core/data';
import { IDocsItem, ITocLink } from '@docs-core/models';

import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
// Prism.languages['preview-html'] = Prism.languages['html'];
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

const OUT_DIR = path.join(__dirname, '../../dist/docs/content');
const CONTENT_MAP_FILE = path.join(OUT_DIR, `docs-contents-map.json`);

yargs(hideBin(process.argv))
  .command(
    '*',
    `Build all docs content into: "${OUT_DIR}".`,
    () => {
      console.log('Building Ngaox Docs Content');
    },
    async (argv: Arguments) => {
      if (argv.watch) console.info(`Watch mode is enabled.`);
      console.info(``);
      await fs.ensureDir(OUT_DIR);
      await fs.emptyDir(OUT_DIR);
      await build((argv.watch as boolean) || false);
    }
  )
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    description: 'Rerun build when files change.'
  })
  .help('help')
  .parse();

async function build(watch: boolean) {
  const sections = DOCS_SECTIONS;
  const WriteContentMap = async () => {
    await fs.writeJSON(
      CONTENT_MAP_FILE,
      sections.map(section => ({
        ...section,
        items: section.items
          .filter(el => el !== undefined)
          .sort(SortItemsCallback)
          .map(item => ({
            name: item.name,
            slug: item.slug
          }))
      }))
    );
    console.log(`- Writing content map to: ${CONTENT_MAP_FILE}`);
  };
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const itemsIndexes = {};
    const ContentGlobPath = path.join(__dirname, '../../', section.content);
    const SlugsPrefix = section.routesPrefix ?? '';
    const filesNumber = glob.sync(ContentGlobPath).length;
    let builtFilesNumber = 0;
    section.items = [];
    delete section.routesPrefix;
    delete section.content;
    sections[i] = section;

    console.log(`- Found ${filesNumber} items in "${section.name}" section.`);

    const watcher = chokidar.watch(ContentGlobPath);
    const buildDocItemCallback = async (filePath: string) => {
      const item = await buildItem(filePath, SlugsPrefix);
      if (itemsIndexes[filePath]) {
        section.items[itemsIndexes[filePath]] = item;
      } else {
        builtFilesNumber++;
        itemsIndexes[filePath] = section.items.push(item) - 1;
      }
      sections[i] = section;
      if (builtFilesNumber >= filesNumber) {
        await WriteContentMap();
        if (!watch) {
          watcher
            .close()
            .then(() =>
              console.log(`\n- Done building "${section.name}" section!`)
            );
        }
      }
    };
    watcher
      .on('add', buildDocItemCallback)
      .on('change', buildDocItemCallback)
      .on('unlink', async (filePath: string) => {
        const obj = section.items[itemsIndexes[filePath]];
        console.log(
          `\t-> Removing "${obj.name}" from "${section.name}" section.`
        );
        delete section.items[itemsIndexes[filePath]];
        delete itemsIndexes[filePath];
        await WriteContentMap();
      });
  }
}

async function buildItem(filePath: string, slugPrefix: string) {
  const content = await fs.readFile(filePath, 'utf8');
  const TOC: ITocLink[] = [];
  const { data, content: markdown } = matter(content);

  const markedRenderer = new marked.Renderer();
  markedRenderer.heading = (text: string, level: number) => {
    const id = text
      .toLowerCase()
      .trim()
      // remove unwanted chars
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        ''
      )
      .replace(/\s/g, '-');
    if (!data.title && level === 1) {
      data.title = text;
    } else if (level === 2 || level === 3) {
      TOC.push({
        title: text,
        id,
        level: `h${level}`
      });
    }
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  const html = marked.parse(markdown, {
    renderer: markedRenderer
  });
  const highlightedHtmlNode = new JSDOM(html).window.document.body;
  Prism.highlightAllUnder(highlightedHtmlNode);

  const outObj: IDocsItem = {
    title: data.title,
    name: data.name,
    description: data?.description ?? '',
    slug: `${slugPrefix}${data.slug || path.basename(filePath, '.md')}`,
    content: highlightedHtmlNode.innerHTML,
    order: data?.order,
    toc: TOC
  };

  const outFile = path.join(OUT_DIR, `${outObj.slug}.json`);
  console.log(`\t-> Writing ${outFile}`);

  await fs.ensureDir(path.dirname(outFile));
  await fs.writeJSON(outFile, outObj);
  return outObj;
}
