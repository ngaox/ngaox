import { ActivatedRouteSnapshot } from '@angular/router';
import { MetaDefinition } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

export const SeoKey = 'NgaoxSeo';
export const SeoDefaultsToken = new InjectionToken('DefaultsSeoData');

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
  extra?: MetaDefinition[];
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
