import { IParser } from '../../models/builder';

export const rawParser: IParser = (content: string) => {
  return {
    content,
    data: {}
  };
};
