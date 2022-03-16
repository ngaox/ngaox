import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { IPressOptions } from './press';

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
