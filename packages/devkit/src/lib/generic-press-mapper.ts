import { IPressMapper } from '../modals';

export const genericPressMapper: IPressMapper<
  Array<{
    path: string;
    metadata: {
      [key: string]: any;
    };
  }>
> = {
  push: (previous, filePath, metadata) => {
    return [
      ...previous,
      {
        path: filePath,
        metadata
      }
    ];
  },
  remove: (previous, filePath: string) => {
    return previous.filter(({ path }) => path !== filePath);
  }
};
