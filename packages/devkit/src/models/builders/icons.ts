export interface ISvgIconsOptions {
  dir: string;
  namespace?: string;
  /**
   * Set this if you want to optimize your svg files.
   *
   * https://github.com/svg/svgo#configuration
   */
  svgoConfig?: any;
}

export interface ILazyIcon {
  url: string;
  lazy: true;
}

export interface INgaoxIcon {
  name: string;
  data: string | ILazyIcon;
}
