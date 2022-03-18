import { IBuilderOptions } from '../../src';
import { envVariablesPlugin } from './env-variables';

export function getNgBuildTransforms(options: IBuilderOptions) {
  return options.allowEnvVariables ? envVariablesPlugin() : undefined;
}
