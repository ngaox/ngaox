import { InjectionToken } from '@angular/core';
import { ILazyIcon } from '@ngaox/devkit/common/icons';

export const NGAOX_FALLBACK: InjectionToken<string> = new InjectionToken(
  'NgaoxFallbackIcon'
);

export interface ICompactIcons {
  [name: string]: string | ILazyIcon;
}
