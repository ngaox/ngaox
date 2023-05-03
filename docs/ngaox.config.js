const { DocsBuilder } = require('@ngaox/devkit');

require('prismjs/components/prism-bash');
require('prismjs/components/prism-typescript');

/**
 * @type {import('@ngaox/devkit').IBuilderOptions}
 */
module.exports = {
  content: {
    icons: 'docs/app/src/icons',
    docs: {
      dir: 'docs/content',
      builder: new DocsBuilder(require('./docs.sections'))
    }
  }
};
