import { IDocsSection } from '@docs-core/models';

export const DocsSections: IDocsSection[] = [
  {
    name: 'Getting Started',
    routesPrefix: '',
    content: '/docs/content/start/*.md',
    order: 1
  },
  {
    name: 'Ngaox Tools',
    routesPrefix: 'dx/',
    content: '/docs/content/devkit/*.md',
    order: 2
  },
  {
    name: 'Advanced',
    routesPrefix: 'advanced/',
    content: '/docs/content/advanced/*.md'
  }
];
