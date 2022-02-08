const { projects } = require('../angular.json');
const packageJsonVersion = require('../package.json').version;
const fs = require('fs');
const path = require('path');

module.exports = {
  preCommit
};

function preCommit(props) {
  const version = props
    ? props.version || packageJsonVersion
    : packageJsonVersion;
  Object.values(projects)
    .map(dir => path.resolve(`${__dirname}/../${dir}/package.json`))
    .filter(fs.existsSync)
    .forEach(packageJsonPath => {
      const packageJson = require(packageJsonPath);
      packageJson.version = version;
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n'
      );
    });
}

preCommit();
