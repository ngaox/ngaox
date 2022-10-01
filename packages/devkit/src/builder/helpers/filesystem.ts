import { CONTENT_DIR } from '../../models/constants';
import { IMapperExtraOptions } from '../../models/builder';

export function getIconsPublicPath(extraOptions: IMapperExtraOptions): string {
  return `${extraOptions.outputPath}/${CONTENT_DIR}/icons`;
}
