import { IDocsSection } from '@docs-core/models';

export const DocsSections: IDocsSection[] = [
  {
    name: 'Getting Started',
    icon: 'book',
    routesPrefix: '',
    content: '/docs/content/start/*.md',
    order: 1
  }
];
