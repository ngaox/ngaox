import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';
import marked = require('marked');
import { JSDOM } from 'jsdom';
import { DOCS_SECTIONS, SortItemsCallback } from '@docs-core/data';
import { IDocsItem, IDocsSection } from '@docs-core/models';

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
      console.log('Building docs content...');
    },
    async (argv: Arguments) => {
      if (argv.watch) console.info(`Watch mode is enabled.`);
      await fs.ensureDir(OUT_DIR);
      await fs.emptyDir(OUT_DIR);
      await build((argv.watch as boolean) || false);
      console.info(`\n`);
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
  console.info(`\n`);
  const sections = await Promise.all(
    DOCS_SECTIONS.map(async section => {
      const ContentGlobPath = path.join(__dirname, '../../', section.content);
      section.items = await Promise.all(
        glob.sync(ContentGlobPath).map(file => buildItem(file, section))
      );

      console.log(`- ${section.items.length} items in ${section.name}`);
      section.items.sort(SortItemsCallback).map(item => ({
        name: item.name,
        slug: item.slug
      }));
      return section;
    })
  );
  sections.sort(SortItemsCallback);
  await fs.writeJSON(CONTENT_MAP_FILE, sections);
  console.log(`- Writing content map to: ${CONTENT_MAP_FILE}`);
  if (watch) {
    // TODO: Watch for changes and rebuild
    // https://github.com/paulmillr/chokidar
  }
}

async function buildItem(filePath: string, section: IDocsSection) {
  const content = await fs.readFile(filePath, 'utf8');
  const { data, content: markdown } = matter(content);

  const html = marked.parse(markdown);
  const highlightedHtmlNode = new JSDOM(html).window.document.body;
  Prism.highlightAllUnder(highlightedHtmlNode);

  const outObj: IDocsItem = {
    name: data.name,
    description: data?.description ?? '',
    slug: `${section.routesPrefix}${
      data.slug || path.basename(filePath, '.md')
    }`,
    content: highlightedHtmlNode.innerHTML,
    order: data?.order
  };

  const outFile = path.join(OUT_DIR, `${outObj.slug}.json`);
  console.log(`- Writing ${outFile}`);

  await fs.ensureDir(path.dirname(outFile));
  await fs.writeJSON(outFile, outObj);
  return outObj;
}
