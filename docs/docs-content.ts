import { DocItem } from './app/src/app/core/interfaces';

export type DocContentItem = DocItem & {
  contentUrl: string;
  priority?: number;
};

export const DocItems: DocContentItem[] = [
  {
    name: 'README',
    slug: 'getting-started',
    priority: 1,
    contentUrl: '/README.md'
  },
  {
    name: 'Chaospad README',
    slug: 'chaospad',
    contentUrl: '/packages/chaospad/README.md'
  },
  {
    name: 'Seo README',
    slug: 'seo',
    contentUrl: '/packages/seo/README.md'
  },
  {
    name: 'Icons README',
    slug: 'icons',
    contentUrl: '/packages/icons/README.md'
  },
  {
    name: 'Padup README',
    slug: 'padup',
    contentUrl: '/packages/padup/README.md'
  }
];
