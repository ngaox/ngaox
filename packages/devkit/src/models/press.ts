import { IParsedContent } from '../press/models';
import { BuilderContext } from '@angular-devkit/architect';

export interface IPressOptions {
  dir: string;
  // The path/glob-pattern to the markdown files.
  content: string;
  mapper?: IPressMapper<unknown, unknown>;
}

export interface IMapperExtraOptions {
  options: IPressOptions;
  context: BuilderContext;
  outputPath: string;
}

export interface IPressMapper<T, T2> {
  empty: T;
  mapValues: (
    current: T,
    filePath: string,
    parsed: IParsedContent,
    extra: IMapperExtraOptions
  ) => Promise<[string, T2]>;
  write?: (contentMap: T, extra: IMapperExtraOptions) => Promise<void>;
  push: (previous: T, filePath: string, obj: T2) => T;
  remove: (previous: T, filePath: string) => [T, string];
}
