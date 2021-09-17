const fs = require('fs-extra');
const path = require('path');
const { log, logSeparatedMsg } = require('../../scripts-utils');

module.exports = async function buildIcons(
  iconsDir,
  outputFile,
  namespace = ''
) {
  log('', '', false);
  logSeparatedMsg(`Building icons from: ${iconsDir}`, '', false, 'blue');
  const files = await getSvgFiles(iconsDir);
  log(`Getting all SVG icons...`, 'greenCheckMark', false);
  if (files.length < 1) {
    log(
      `No svg icon found in dir: ${path.resolve(iconsDir)}\n`,
      'redFailMark',
      false
    );
    process.exit(1);
  }
  log(`Building ${files.length} svg file...`, 'greenCheckMark', false);
  let iconsList = {};
  files.forEach(filepath => {
    const iconName = (
      (namespace ? `${namespace}:` : '') +
      filepath
        .slice(iconsDir.length + 1)
        .slice(0, -4)
        .replace(/\\/g, ':')
        .replace(/\//g, ':')
    ).toLowerCase();

    const collectionName =
      iconName
        .split(':')
        .slice(0, -1)
        .map(namespace => namespace[0].toUpperCase() + namespace.slice(1))
        .join('') || 'default';

    if (!iconsList[collectionName]) iconsList[collectionName] = [];

    const svgElm = fs.readFileSync(filepath).toString();
    iconsList[collectionName].push({
      name: iconName,
      svg: svgElm
    });
  });
  log(`Writing output to json file`, 'greenCheckMark', false);
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(iconsList));
  // scripts end
  console.log('');
  logSeparatedMsg(`Built done! to: ${path.resolve(outputFile)}`, 'green');
};

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
