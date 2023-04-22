import { writeJSON } from 'fs-extra';
import { IBuilder } from '../../models/builder';
import { IMetaData, IParsedContent } from '../../models/builders/generic';
import { CONTENT_MAP_FILE } from '../../models/constants';
import { unlinkFile } from '../../utils/filesystem';
import { getCleanRelative } from '../../utils/generators-options';
import { getTaskOutputPath } from '../helpers/filesystem';

export class GenericBuilder implements IBuilder {
  memory: { [key: string]: IMetaData } = {};

  async push(parsed: IParsedContent, filePath: string, extra) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    const slug = filePath.replace(/\.[^/.]+$/, '');
    filePath = `${slug}.json`;
    this.memory[filePath] = {
      slug,
      toc: parsed.toc,
      data: parsed.data
    } as IMetaData;
    const outputPath = getTaskOutputPath(extra);
    await writeJSON(filePath, parsed, outputPath);
    await writeJSON(CONTENT_MAP_FILE, Object.values(this.memory), outputPath);
  }

  async remove(filePath: string, extra) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    filePath = `${filePath.replace(/\.[^/.]+$/, '')}.json`;
    delete this.memory[filePath];
    const outputPath = getTaskOutputPath(extra);
    await unlinkFile(filePath, outputPath);
    await writeJSON(CONTENT_MAP_FILE, Object.values(this.memory), outputPath);
  }
}
