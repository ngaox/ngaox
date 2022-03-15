import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

export type IBuilderOptions = {
  config?: string;
  configurations?: { [key: string]: Partial<IBuilderConfiguration> };
} & IBuilderConfiguration;

export interface IBuilderConfiguration {
  watch?: boolean;
  outputPath: string;
  ngBuild: Partial<Omit<BrowserBuilderOptions, 'watch' | 'outputPath'>>;
  press?: IPressOptions;
  // Checkout https://github.com/chihab/ngx-env before using this option
  allowEnvVariables?: boolean;
}

export interface IPressMapper<T> {
  push: (
    previous: T,
    filePath: string,
    metadata: {
      [key: string]: any;
    }
  ) => T;
  remove: (previous: T, filePath: string) => T;
}

export interface IPressOptions {
  dir: string;
  // The path/glob-pattern to the markdown files.
  content: string;
  mapper?: IPressMapper<any> | false;
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
