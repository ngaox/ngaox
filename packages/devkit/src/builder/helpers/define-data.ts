import * as webpack from 'webpack';
import { Configuration } from 'webpack';
import { NGAOX_DATA_VAR } from '../../models/constants';
import { IClientSideData } from '../../models/builder';

export function defineDataPlugin(data: unknown) {
  return {
    webpackConfiguration: async (webpackConfig: Configuration) => {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          [NGAOX_DATA_VAR]: JSON.stringify(data)
        })
      );
      return webpackConfig;
    }
  };
}

export function mergeDefinedDataObjects(data: (null | IClientSideData)[]) {
  const dataToBeDefined = data.reduce((acc, curr) => {
    if (curr === null) return acc;
    return {
      ...acc,
      [curr.type]: curr.data
    };
  }, {});
  return dataToBeDefined as {
    [key: string]: IClientSideData;
  };
}
