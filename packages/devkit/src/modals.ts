import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

export type IBuilderOptions = {
  config?: string;
  configurations?: { [key: string]: Partial<IBuilderConfiguration> };
} & IBuilderConfiguration;

export interface IBuilderConfiguration {
  ngBuild: Partial<BrowserBuilderOptions>;
  press?: IPressOptions;
  // Checkout https://github.com/chihab/ngx-env before using this option
  allowEnvVariables?: boolean;
}

export interface IPressOptions {
  // The path/glob-pattern to the markdown files.
  content: string;
}

export interface ITocLink {
  title: string;
  id: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface IParsedContent {
  data: {
    [key: string]: string;
  };
  content: string;
  toc: ITocLink[];
}
