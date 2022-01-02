const { version } = require('../package.json');
const { projects } = require('../angular.json');
const fs = require('fs-extra');
const path = require('path');

Object.values(projects)
  .map(dir => path.resolve(`${__dirname}/../${dir}/package.json`))
  .filter(fs.existsSync)
  .forEach(packageJsonPath => {
    const packageJson = require(packageJsonPath);
    packageJson.version = version;
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
  });
