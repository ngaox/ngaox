import { CONTENT_PATH } from '../../models/constants';
import {
  IMapperExtraOptions,
  IOptionsObjectStrict
} from '../../models/builder';

export function getContentOutputPath(options: IOptionsObjectStrict): string {
  return removeRepeatedSlashes(`${options.browser.outputPath}/${CONTENT_PATH}`);
}

export function getTaskOutputPath(extraOptions: IMapperExtraOptions): string {
  return removeRepeatedSlashes(
    `${extraOptions.outputPath}/${CONTENT_PATH}/${extraOptions.name}`
  );
}

export function getFileBrowserPath(
  extraOptions: IMapperExtraOptions,
  relativePath: string
): string {
  return removeRepeatedSlashes(
    `/${extraOptions.baseHref}/${CONTENT_PATH}/${extraOptions.name}/${relativePath}`
  );
}

function removeRepeatedSlashes(path: string): string {
  return path.replace(/\/+/g, '/');
}
