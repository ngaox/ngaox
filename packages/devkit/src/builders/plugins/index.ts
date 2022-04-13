import {
  IBuilderOptions,
  IWebpackTransforms
} from '../../models/builders/builder';
import { envVariablesPlugin } from './env-variables';
import { BuilderContext } from '@angular-devkit/architect';
import { svgIconsPlugin } from './svg-icons';
import { map, Observable, of } from 'rxjs';

import * as webpack from 'webpack';
import { Configuration } from 'webpack';

import { NGAOX_ICONS_KEY } from '../../models/builders/icons';

export function getNgBuildTransforms(
  options: IBuilderOptions,
  context: BuilderContext
): Observable<IWebpackTransforms> {
  const transforms: IWebpackTransforms = options.allowEnvVariables
    ? envVariablesPlugin()
    : {};

  let transforms$: Observable<IWebpackTransforms> = of(transforms);

  if (options.icons) {
    transforms$ = svgIconsPlugin(
      options.icons,
      context,
      options.outputPath
    ).pipe(
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

  return transforms$;
}
