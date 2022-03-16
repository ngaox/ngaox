export interface INgaoxFeature {
  headline: string;
  body: string;
  image: string;
  imgAlt: string;
  routerLink: string;
}

export interface IDocsSection {
  name: string;
  routesPrefix: string;
  /** Glob pattern for matching files */
  content: string;
  order?: number;
  items?: IDocsItem[];
}

export interface ITocLink {
  title: string;
  id: string;
  level: 'h2' | 'h3';
}

export interface IDocsItem {
  title: string;
  /** Short version of the title */
  name: string;
  slug: string;
  metadata: any;
  content?: string;
  toc?: ITocLink[];
}
