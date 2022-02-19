import { IDocsSection } from '@docs-core/models';

export const DocsSections: IDocsSection[] = [
  {
    name: 'Getting Started',
    routesPrefix: '',
    content: '/docs/content/start/*.md',
    order: 1
  },
  {
    name: 'Advanced',
    routesPrefix: 'advanced/',
    content: '/docs/content/advanced/*.md'
  }
];
