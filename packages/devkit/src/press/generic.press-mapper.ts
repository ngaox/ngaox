import { IPressMapper } from '../index';
import { IGenericContentMap, IParsedContent } from './modals';

export const genericPressMapper: IPressMapper<
  IGenericContentMap,
  IParsedContent
> = {
  empty: [],
  mapValues: async (curr, filePath: string, parsed: IParsedContent) => [
    filePath.replace(/\..+$/, '.json'),
    parsed
  ],
  push: (previous, filePath, obj) => {
    filePath = filePath.replace(/\..+$/, '.json');
    return [
      ...previous.filter(({ path }) => path !== filePath),
      {
        path: filePath,
        data: obj.data
      }
    ];
  },
  remove: (previous, filePath: string) => {
    filePath = filePath.replace(/\..+$/, '.json');
    return [previous.filter(({ path }) => path !== filePath), filePath];
  }
};