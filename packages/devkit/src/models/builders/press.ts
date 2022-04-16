import { BuilderContext } from '@angular-devkit/architect';
import { IParsedContent } from '../../models/mappers/generic';

export interface IPressOptions {
  dir: string;
  // The path/glob-pattern to the markdown files.
  content: string;
  mapper?: IPressMapper;
}

export interface IMapperExtraOptions {
  outputPath: string;
  options: IPressOptions;
  context: BuilderContext;
}

export interface IPressMapper {
  push: (
    parsed: IParsedContent,
    filePath: string,
    extra: IMapperExtraOptions
  ) => Promise<void>;
  remove: (filePath: string, extra: IMapperExtraOptions) => Promise<void>;
}
