import { DocContentItem, DocItemType } from './models';

export const DocItems: DocContentItem[] = [
  {
    name: 'README',
    slug: 'getting-started',
    priority: 1,
    screenshotUrl: 'https://picsum.photos/320/200?id=getting-started',
    contentUrl: '/README.md'
  },
  {
    name: 'Seo README',
    slug: 'seo',
    type: DocItemType.Demo,
    screenshotUrl: 'https://picsum.photos/320/200?id=seo',
    contentUrl: '/packages/seo/README.md'
  },
  {
    name: 'Icons README',
    slug: 'icons',
    screenshotUrl: 'https://picsum.photos/320/200?id=icons',
    contentUrl: '/packages/icons/README.md'
  }
];
