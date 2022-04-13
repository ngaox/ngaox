import { OptimizeOptions } from 'svgo';

export interface ISvgIconsOptions {
  dir: string;
  namespace?: string;
  svgoConfig?: OptimizeOptions;
}

export const NGAOX_ICONS_KEY = '_NGAOX_BUILT_ICONS';

export interface ILazyIcon {
  url: string;
  lazy: true;
}

export interface INgaoxIcon {
  name: string;
  data: string | ILazyIcon;
}
