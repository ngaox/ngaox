import { INgaoxIcon } from '../models';

declare const _NGAOX_BUILT_ICONS: INgaoxIcon[];

export const NGAOX_ICONS_KEY = '_NGAOX_BUILT_ICONS';

export function ngaoxIconAdapter(): INgaoxIcon[] {
  return _NGAOX_BUILT_ICONS;
}
