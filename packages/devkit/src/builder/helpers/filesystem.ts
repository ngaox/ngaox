import { CONTENT_PATH } from '../../models/constants';
import { IMapperExtraOptions } from '../../models/builder';

export function getTaskOutputPath(extraOptions: IMapperExtraOptions): string {
  return `${extraOptions.outputPath}/${CONTENT_PATH}/${extraOptions.name}`;
}
