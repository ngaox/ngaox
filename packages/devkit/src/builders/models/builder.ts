import {
  BrowserBuilderOptions,
  ExecutionTransformer
} from '@angular-devkit/build-angular';
import { ISvgIconsOptions } from './icons';
import { IPressOptions } from './press';
import { Configuration as WebpackConfiguration } from 'webpack';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';

export type IBuilderOptions = {
  config?: string;
  configurations?: { [key: string]: Partial<IBuilderConfiguration> };
} & IBuilderConfiguration;

export interface IBuilderConfiguration {
  watch?: boolean;
  outputPath: string;
  ngBuild: Partial<
    Omit<BrowserBuilderOptions, 'watch' | 'outputPath' | 'deleteOutputPath'>
  >;
  press?: IPressOptions;
  icons?: ISvgIconsOptions;
  // Checkout https://github.com/chihab/ngx-env before using this option
  allowEnvVariables?: boolean;
}

export interface IWebpackTransforms {
  webpackConfiguration?: ExecutionTransformer<WebpackConfiguration>;
  logging?: WebpackLoggingCallback;
  indexHtml?: IndexHtmlTransform;
}
