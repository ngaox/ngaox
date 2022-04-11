import { IBuilderOptions } from '../models/builder';
import { envVariablesPlugin } from './env-variables';

export function getNgBuildTransforms(options: IBuilderOptions): unknown {
  return options.allowEnvVariables ? envVariablesPlugin() : {};
}
