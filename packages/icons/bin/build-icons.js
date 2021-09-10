#! /usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

// TODO get these CONSTs via arguments...
const ICONS_DIR = 'packages/icons/src/svgs';
const OUTPUT_DIR = 'packages/icons/src/svgs/index.json';
const NAME_SPACE = '';

(async function () {
  const files = await getSvgFiles(ICONS_DIR);
  let iconsList = {};
  files.forEach(filepath => {
    const iconName =
      (NAME_SPACE ? `${NAME_SPACE}:` : '') +
      filepath
        .slice(ICONS_DIR.length + 1)
        .slice(0, -4)
        .replace(/\\/g, ':')
        .replace(/\//g, ':');

    const collectionName =
      iconName.split(':').slice(0, -1).join(':') || 'default';
    if (!iconsList[collectionName]) iconsList[collectionName] = [];

    const svgElm = fs.readFileSync(filepath).toString();
    iconsList[collectionName].push({
      name: iconName,
      svg: svgElm
    });
  });
  fs.writeFileSync(OUTPUT_DIR, JSON.stringify(iconsList));
})();

async function getSvgFiles(dir, fileList = []) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = await getSvgFiles(path.join(dir, file), fileList);
    } else file.endsWith('.svg') && fileList.push(path.join(dir, file));
  }
  return fileList;
}
