export interface INgaoxFeature {
  headline: string;
  body: string;
  image: string;
  imgAlt: string;
  routerLink: string;
}

export interface IDocsSection {
  name: string;
  /** to use with `ngaox-icon` */
  icon: string;
  routesPrefix: string;
  /** Glob pattern for matching files */
  content: string;
  order?: number;
  items?: IDocsItem[];
}

// table of content interface
// export interface IToc {

// }

export interface IDocsItem {
  name: string;
  slug: string;
  description?: string;
  content?: string;
  order?: number;
  // table of content table
}
