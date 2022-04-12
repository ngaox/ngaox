import { InjectionToken } from '@angular/core';

export const NGAOX_FALLBACK: InjectionToken<string> = new InjectionToken(
  'NgaoxFallbackIcon'
);

export * from '@ngaox/devkit/src/index.icons';
export { ILazyIcon } from '@ngaox/devkit/src/index.icons';

export interface ICompactIcons {
  [name: string]: string | ILazyIcon;
}
