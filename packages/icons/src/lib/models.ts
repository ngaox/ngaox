import { InjectionToken } from '@angular/core';

export const FALLBACK_ICON: InjectionToken<string> = new InjectionToken(
  'FALLBACK_ICON'
);

export interface SvgIcon {
  name: string;
  svg: string;
}
export interface IconByUrl {
  name?: string;
  url: string;
}
