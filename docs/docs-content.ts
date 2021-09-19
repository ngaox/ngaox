import { DocItem } from './app/src/app/core/interfaces';

export type DocContentItem = DocItem & {
  contentUrl: string;
  priority?: number;
};

export const DocItems: DocContentItem[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    contentUrl: ''
  },
  {
    name: 'Xetting Started',
    slug: 'getting-starfgdted',
    contentUrl: ''
  },
  {
    name: 'Betting Started',
    slug: 'getting-stdfgarted',
    contentUrl: ''
  },
  {
    name: 'GGetting Started',
    slug: 'gettdgfing-started',
    contentUrl: ''
  },
  {
    name: 'Getting Started dsf',
    slug: 'gettidgfng-started',
    priority: 1,
    contentUrl: ''
  },
  {
    name: 'Aetting Started',
    slug: 'getting-stargdted',
    contentUrl: ''
  }
];
