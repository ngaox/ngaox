import {
  BrowserBuilderOptions,
  ExecutionTransformer
} from '@angular-devkit/build-angular';
import { Target } from '@angular-devkit/architect';
import { ISvgIconsOptions } from './icons';
import { IPressOptions } from './press';
import { Configuration as WebpackConfiguration } from 'webpack';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';

export type IBrowserBuilderOptions = Omit<
  BrowserBuilderOptions,
  'deleteOutputPath'
> & {
  'config-dir'?: string;
};

export interface IOptionsObject {
  browserTarget: Target;
  browser: IBrowserBuilderOptions;
  builder: IBuilderOptions;
}

export interface IBuilderOptions {
  watch?: boolean;
  outputPath: string;
  // Checkout https://github.com/chihab/ngx-env before using this option
  allowEnvVariables?: boolean;
  press?: IPressOptions;
  icons?: ISvgIconsOptions;
}

export interface IWebpackTransforms {
  webpackConfiguration?: ExecutionTransformer<WebpackConfiguration>;
  logging?: WebpackLoggingCallback;
  indexHtml?: IndexHtmlTransform;
}
