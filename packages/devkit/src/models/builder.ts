import { Target } from '@angular-devkit/architect';
import { IParsedContent } from './builders/generic';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { BuilderContext } from '@angular-devkit/architect';

export type IBrowserBuilderOptions = {
  configDir?: string;
  browserTarget: string;
};

export interface IOptionsObject {
  browserTarget: Target;
  browser: BrowserBuilderOptions;
  builder: {
    watch?: boolean;
    content: {
      [name: string]: string | IBuilderTaskOptions;
    };
  };
}

export interface IBuilderOptions {
  watch?: boolean;
  content: {
    [name: string]: IBuilderTaskOptions;
  };
}

export type IParser = (content: string) => IParsedContent;
export interface IBuilderTaskOptions {
  dir: string;
  glob: string;
  parser: IParser;
  builder: IBuilder;
  // Extra options for the builder
  extra?: {
    [key: string]: unknown;
  };
}

export interface IMapperExtraOptions {
  name: string;
  outputPath: string;
  options: IBuilderTaskOptions;
  context: BuilderContext;
}

export interface IBuilder {
  push: (
    parsed: IParsedContent,
    filePath: string,
    extra: IMapperExtraOptions
  ) => Promise<void>;
  remove: (filePath: string, extra: IMapperExtraOptions) => Promise<void>;
}
