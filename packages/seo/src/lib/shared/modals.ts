import { ActivatedRouteSnapshot } from '@angular/router';

export const SeoKey = 'NgaoxSeo';
export const SeoDefaultsToken = Symbol('DefaultsSeoData');

export interface ISeoLoader {
  resolve(route: ActivatedRouteSnapshot): IPageSeoData;
}

export interface IPageSeoData {
  title?: string;
  keywords?: string;
  description?: string;
  url?: string;
  type?: string;
  image?: string | ISeoImage;
  twitter?: ISeoTwitter;
  fbAppId?: string;
  siteName?: string;
  'theme-color'?: string;
  canonical?: string;
}

export interface ISeoImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  mimeType?: string;
}
export interface ISeoTwitter {
  site?: string;
  creator?: string;
  card?: 'summary_large_image' | 'summary';
}
