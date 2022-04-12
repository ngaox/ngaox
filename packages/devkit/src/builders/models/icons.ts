import { OptimizeOptions } from 'svgo';

export interface ISvgIconsOptions {
  dir: string;
  namespace?: string;
  svgoConfig?: OptimizeOptions;
}
