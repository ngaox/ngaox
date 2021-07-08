import { registerPlugin, scullyConfig, ScullyConfig } from '@scullyio/scully';
import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import { join } from 'path';

registerPlugin('router', 'static', (route?: string, config?: any): any => {
  return [
    {
      route,
      templateFile: join(`${scullyConfig.homeFolder}`, config.file),
      postRenderers: ['contentFolder', docLink]
    }
  ];
});

export const config: ScullyConfig = {
  projectRoot: './docs/src',
  projectName: 'docs',
  outDir: './dist/static',
  routes: {
    '/docs/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './docs/content'
      },
      postRenderers: [docLink]
    },
    '/docs/seo': {
      type: 'static',
      file: './projects/seo/README.md'
    }
  }
};
