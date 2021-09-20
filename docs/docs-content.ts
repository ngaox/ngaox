import { DocItem } from './app/src/app/core/interfaces';

export type DocContentItem = DocItem & {
  contentUrl: string;
  priority?: number;
};

export const DocItems: DocContentItem[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    contentUrl: '/README.md'
  },
  {
    name: 'Xetting Started',
    slug: 'getting-starfgdted',
    contentUrl: '/packages/chaospad/README.md'
  },
  {
    name: 'Betting Started',
    slug: 'getting-stdfgarted',
    contentUrl: '/README.md'
  },
  {
    name: 'GGetting Started',
    slug: 'gettdgfing-started',
    contentUrl: '/README.md'
  },
  {
    name: 'Getting Started dsf',
    slug: 'gettidgfng-started',
    priority: 1,
    contentUrl: '/README.md'
  },
  {
    name: 'Aetting Started',
    slug: 'getting-stargdted',
    contentUrl: '/README.md'
  }
];
