import { IBuilderOptions, IWebpackTransforms } from '../models/builder';
import { envVariablesPlugin } from './env-variables';
import { BuilderContext } from '@angular-devkit/architect';
import { svgIconsPlugin } from './svg-icons';
import { map, Observable } from 'rxjs';

import * as webpack from 'webpack';
import { Configuration } from 'webpack';

import { NGAOX_ICONS_KEY } from '../../index.icons';

export function getNgBuildTransforms(
  options: IBuilderOptions,
  context: BuilderContext
): Observable<IWebpackTransforms> {
  const transforms: IWebpackTransforms = options.allowEnvVariables
    ? envVariablesPlugin()
    : {};

  return svgIconsPlugin(options.icons, context, options.outputPath).pipe(
    map(icons => {
      return {
        logging: transforms.logging,
        indexHtml: transforms.indexHtml,
        webpackConfiguration: async (webpackConfig: Configuration) => {
          if (transforms.webpackConfiguration) {
            webpackConfig = await transforms.webpackConfiguration(
              webpackConfig
            );
          }
          webpackConfig.plugins.push(
            new webpack.DefinePlugin({
              [NGAOX_ICONS_KEY]: JSON.stringify(icons)
            })
          );
          return webpackConfig;
        }
      };
    })
  );
}
