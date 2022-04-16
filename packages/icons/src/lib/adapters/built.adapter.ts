import { INgaoxIcon } from '@ngaox/devkit/common/icons';

declare const _NGAOX_BUILT_ICONS: INgaoxIcon[];

/**
 * Adapter if you use @ngaox/devkit to build svg icons
 */
export function builtIconAdapter(): INgaoxIcon[] {
  return _NGAOX_BUILT_ICONS;
}
