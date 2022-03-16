/**
 * @type {import('@ngaox/devkit').IBuilderOptions}
 */
module.exports = {
  press: {
    dir: 'docs/content',
    content: '**/*.md',
    mapper: require('@ngaox/devkit').getDocsPressMapper([
      {
        name: 'Getting Started',
        routesPrefix: '',
        directory: 'start',
        order: 1
      },
      {
        name: 'Ngaox Tools',
        routesPrefix: 'dx/',
        directory: 'devkit',
        order: 2
      },
      {
        name: 'Advanced',
        routesPrefix: 'advanced/',
        directory: 'advanced'
      }
    ])
  },
  ngBuild: {
    index: 'docs/app/src/index.html',
    main: 'docs/app/src/main.ts',
    polyfills: 'docs/app/src/polyfills.ts',
    tsConfig: 'docs/app/tsconfig.app.json',
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
