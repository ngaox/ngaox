import { IBuilderOptions } from '../../src/models';
import { envVariablesPlugin } from './env-variables';

export function getNgBuildTransforms(options: IBuilderOptions): unknown {
  return options.allowEnvVariables ? envVariablesPlugin() : {};
}
