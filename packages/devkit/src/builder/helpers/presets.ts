import { IBuilderTaskOptions } from '../../models/builder';
import { rawParser } from '../parsers/raw.parser';
import { IconsBuilder } from '../builders/icons.builder';

export const contentBuilderPresets: {
  [name: string]: Omit<IBuilderTaskOptions, 'dir'>;
} = {
  icons: {
    glob: '**/*.svg',
    parser: rawParser,
    builder: new IconsBuilder(),
    extra: {
      namespace: 'app',
      svgoConfig: {}
    }
  }
};
