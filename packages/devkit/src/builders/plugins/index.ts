import {
  IBuilderOptions,
  IWebpackTransforms
} from '../../models/builders/builder';
import { envVariablesPlugin } from './env-variables';
import { BuilderContext } from '@angular-devkit/architect';
import * as webpack from 'webpack';

export function getNgBuildTransforms(
  options: IBuilderOptions,
  context: BuilderContext
): IWebpackTransforms {
  let transforms: IWebpackTransforms = {};
  if (options.allowEnvVariables) {
    transforms = addWebpackPlugin(transforms, envVariablesPlugin());
  }
  return transforms;
}

export function addWebpackPlugin(transforms: IWebpackTransforms, plugin: any) {
  if (!plugin) {
    return transforms;
  }
  return {
    logging: transforms?.logging,
    indexHtml: transforms?.indexHtml,
    webpackConfiguration: async (webpackConfig: webpack.Configuration) => {
      if (transforms.webpackConfiguration) {
        webpackConfig = await transforms.webpackConfiguration(webpackConfig);
      }
      webpackConfig.plugins.push(plugin);
      return webpackConfig;
    }
  };
}
