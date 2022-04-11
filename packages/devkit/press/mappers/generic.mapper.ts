import { IPressMapper } from '../../src/builders';
import { unlinkFile, writeFile } from '../../src/utils';
import { MAP_FILES } from '../constants';
import { IMetaData, IParsedContent } from '../models/generic';

const memory = {};

export function getGenericMapper(): IPressMapper {
  return {
    push: async (parsed: IParsedContent, filePath: string, extra) => {
      memory[filePath] = parsed as unknown as IMetaData;
      filePath = filePath.replace(/\..+$/, '.json');
      await writeFile(filePath, parsed, {
        dir: extra.outputPath,
        logger: extra.context.logger
      });
      await writeFile(MAP_FILES.main, Object.values(memory), {
        dir: extra.outputPath
      });
    },
    remove: async (filePath: string, extra) => {
      delete memory[filePath];
      filePath = filePath.replace(/\..+$/, '.json');
      await unlinkFile(filePath, {
        dir: extra.outputPath,
        logger: extra.context.logger
      });
      await writeFile(MAP_FILES.main, Object.values(memory), {
        dir: extra.outputPath
      });
    }
  };
}
