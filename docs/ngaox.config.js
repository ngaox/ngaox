require('prismjs/components/prism-typescript');

/**
 * @type {import('@ngaox/devkit').IBuilderOptions}
 */
module.exports = {
  press: {
    dir: 'docs/content',
    content: '**/*.md',
    mapper: require('@ngaox/devkit').getDocsPressMapper(
      require('./docs.sections.js')
    )
  },
  ngBuild: {
    inlineStyleLanguage: 'scss',
    assets: ['docs/app/src/favicon.ico', 'docs/app/src/assets'],
    styles: [
      './node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
      './node_modules/prismjs/themes/prism-okaidia.css',
      'docs/app/src/styles.scss'
    ],
    scripts: []
  }
};
