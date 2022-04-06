import { IMetaData, ITocLink } from './generic-mapper';

export type IDocsMap = Array<IDocsSection>;

export interface IDocsSection {
  name: string;
  routesPrefix: string;
  /** Glob pattern for matching files */
  directory: string;
  order?: number;
  items?: IDocsItem[];
}

export interface IDocsItem {
  name: string;
  slug: string;
  metadata: IMetaData;
  content?: string;
  toc?: ITocLink[];
}
