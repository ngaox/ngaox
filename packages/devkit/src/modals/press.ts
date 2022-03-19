import { IParsedContent } from '@ngaox/press';

export interface IPressOptions {
  dir: string;
  // The path/glob-pattern to the markdown files.
  content: string;
  mapper?: IPressMapper<any, any> | false;
}

export interface IPressMapper<T, T2> {
  empty: T;
  mapValues: (
    current: T,
    filePath: string,
    parsed: IParsedContent
  ) => [string, T2];
  push: (previous: T, filePath: string, obj: T2) => T;
  remove: (previous: T, filePath: string) => [T, string];
}
