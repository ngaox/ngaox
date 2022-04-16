require('prismjs/components/prism-typescript');
require('prismjs/components/prism-bash');

/**
 * @type {import('@ngaox/devkit').IBuilderOptions}
 */
module.exports = {
  press: {
    dir: 'docs/content',
    content: '**/*.md',
    mapper: require('@ngaox/devkit').getDocsMapper(
      require('./docs.sections.js')
    )
  },
  icons: {
    dir: 'docs/app/src/icons',
    namespace: 'app'
  }
};
