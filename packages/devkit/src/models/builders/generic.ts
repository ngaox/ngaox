export interface IMetaData {
  [key: string]: any;
}

export interface IParsedContent {
  data: {
    [key: string]: unknown;
  };
  content: string;
  toc?: ITocLink[];
}

export interface ITocLink {
  title: string;
  id: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
