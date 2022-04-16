import { INgaoxIcon } from '@ngaox/devkit/common/icons';
import { ICompactIcons } from '../models';

export function CompactIconsAdapter(icons: ICompactIcons): INgaoxIcon[] {
  return Object.entries(icons).map(([name, data]) => {
    return {
      name,
      data
    };
  });
}
