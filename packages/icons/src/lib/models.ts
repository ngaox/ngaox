import { InjectionToken } from '@angular/core';

export const NGAOX_FALLBACK: InjectionToken<string> = new InjectionToken(
  'NgaoxFallbackIcon'
);

export interface ICompactIcons {
  [name: string]: string | ILazyIcon;
}

export interface INgaoxIcon {
  name: string;
  data: string | ILazyIcon;
}

export interface ILazyIcon {
  url: string;
  lazy: true;
}

export const NgaoxGlobalIcons: InjectionToken<INgaoxIcon[]> =
  new InjectionToken('NgaoxGlobalIcons');
