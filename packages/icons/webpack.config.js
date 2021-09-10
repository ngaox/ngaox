const path = require('path');
const ShebangPlugin = require('webpack-shebang-plugin');

module.exports = {
  entry: './bin/index.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bin')
  },
  externals: {
    'fs-extra': 'commonjs2 fs-extra',
    yargs: 'commonjs2 yargs'
  },
  plugins: [new ShebangPlugin()]
};
