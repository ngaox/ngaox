import { optimize } from 'svgo';
import { IBuilder, IMapperExtraOptions } from '../../models/builder';
import { IParsedContent } from '../../models/builders/generic';
import { writeFile, writeJSON } from '../../utils/filesystem';
import { cleanPath, getCleanRelative } from '../../utils/generators';
import { getFileBrowserPath, getTaskOutputPath } from '../helpers/filesystem';
import { unlink } from 'fs/promises';
import { join as joinPaths } from 'path';
import { CONTENT_MAP_FILE } from '../../models/constants';

export class IconsBuilder implements IBuilder {
  icons = {};

  async getClientSideData() {
    return {
      type: 'icons',
      data: Object.values(this.icons)
    };
  }

  async push(
    parsed: IParsedContent,
    filePath: string,
    extra: IMapperExtraOptions
  ) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    const slug = cleanPath(filePath.replace(/\.svg$/, ''));
    const result = optimize(parsed.content, extra.options.extra.svgoConfig);
    const url = `${slug}.svg`;
    if (result.error) {
      throw new Error('Failed optimizing SVG file');
    }
    const outputPath = getTaskOutputPath(extra);
    await writeFile(url, result['data'], outputPath);
    this.icons[url] = {
      name: `${
        extra.options.extra.namespace
          ? `${extra.options.extra.namespace ?? ''}:`
          : ''
      }${slug.replace(/\//g, ':')}`,
      data: {
        lazy: true,
        url: getFileBrowserPath(extra, url)
      }
    };
    await writeJSON(CONTENT_MAP_FILE, Object.values(this.icons), outputPath);
  }

  async remove(filePath: string, extra: IMapperExtraOptions) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    const slug = cleanPath(filePath.replace(/\.svg$/, ''));
    const url = `${slug}.svg`;
    delete this.icons[url];
    const outputPath = getTaskOutputPath(extra);
    await unlink(joinPaths(outputPath, url));
    await writeJSON(CONTENT_MAP_FILE, Object.values(this.icons), outputPath);
  }
}
