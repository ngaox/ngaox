const path = require('path');
const ShebangPlugin = require('webpack-shebang-plugin');

module.exports = {
  entry: './bin/index.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bin')
  },
  plugins: [new ShebangPlugin()]
};
