import { Target } from '@angular-devkit/architect';
import { IParsedContent } from './mappers/generic';
import { Configuration as WebpackConfiguration } from 'webpack';
import {
  BrowserBuilderOptions,
  ExecutionTransformer
} from '@angular-devkit/build-angular';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { BuilderContext } from '@angular-devkit/architect';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';

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
