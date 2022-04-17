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
