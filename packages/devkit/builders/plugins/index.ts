import { IBuilderOptions } from '../../src';
import { envVariablesPlugin } from './env-variables';

export function getNgBuildTransforms(options: IBuilderOptions): any {
  return options.allowEnvVariables ? envVariablesPlugin() : {};
}
