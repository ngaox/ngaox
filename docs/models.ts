import { DocItem } from '@docs-core/models';

export enum DocItemType {
  Guide = 'Guides',
  Demo = 'demo'
}

export type DocContentItem = DocItem & {
  contentUrl: string;
  priority?: number;
  type?: DocItemType;
};

export interface DocParentSection {
  name: DocItemType;
  items: DocContentItem[];
}
export type DocSection = DocContentItem | DocParentSection;
