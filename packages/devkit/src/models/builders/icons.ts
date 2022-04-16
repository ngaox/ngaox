import { OptimizeOptions } from 'svgo';

export interface ISvgIconsOptions {
  dir: string;
  namespace?: string;
  svgoConfig?: OptimizeOptions;
}

export interface ILazyIcon {
  url: string;
  lazy: true;
}

export interface INgaoxIcon {
  name: string;
  data: string | ILazyIcon;
}
