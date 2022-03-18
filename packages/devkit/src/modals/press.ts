export interface IPressOptions {
  dir: string;
  // The path/glob-pattern to the markdown files.
  content: string;
  mapper?: IPressMapper<any, any> | false;
}

export interface IPressMapper<T, T2> {
  empty: T;
  mapValues: (
    current: T,
    filePath: string,
    parsed: IParsedContent
  ) => [string, T2];
  push: (previous: T, filePath: string, obj: T2) => T;
  remove: (previous: T, filePath: string) => [T, string];
}

export interface IMetaData {
  [key: string]: any;
}

export interface ITocLink {
  title: string;
  id: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type IGenericContentMap = Array<{
  path: string;
  data: IMetaData;
}>;

export interface IParsedContent {
  data: IMetaData;
  content: string;
  toc: ITocLink[];
}

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
