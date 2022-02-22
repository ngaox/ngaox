import { InjectionToken } from '@angular/core';

export const NGAOX_FALLBACK: InjectionToken<string> = new InjectionToken(
  'NgaoxFallbackIcon'
);

export interface ILazyIcon {
  url: string;
  lazy: true;
}

export interface INgaoxIcon {
  name: string;
  data: string | ILazyIcon;
}

export interface ICompactIcons {
  [name: string]: string | ILazyIcon;
}
