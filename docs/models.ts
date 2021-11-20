import { DocItem } from './app/src/app/core/interfaces';

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
  name: string;
  items: DocContentItem[];
}
export type DocSection = DocContentItem | DocParentSection;
