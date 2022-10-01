import { rawParser } from '../parsers/raw.parser';
import { IconsBuilder } from '../builders/icons.builder';
import { markdownParser } from '../parsers/markdown.parser';
import { IBuilderTaskOptions } from '../../models/builder';

export const contentBuilderPresets: {
  [name: string]: Partial<Omit<IBuilderTaskOptions, 'dir'>>;
} = {
  icons: {
    glob: '**/*.svg',
    parser: rawParser,
    builder: new IconsBuilder(),
    extra: {
      namespace: 'app',
      svgoConfig: {}
    }
  },
  docs: {
    glob: '**/*.md',
    parser: markdownParser,
    extra: {}
  }
};
