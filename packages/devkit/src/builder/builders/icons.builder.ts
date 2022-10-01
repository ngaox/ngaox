import { optimize } from 'svgo';
import { IBuilder, IMapperExtraOptions } from '../../models/builder';
import { IParsedContent } from '../../models/mappers/generic';
import { writeFile } from '../../utils/filesystem';
import { cleanPath, getCleanRelative } from '../../utils/generators-options';
import { getIconsPublicPath } from '../helpers/filesystem';
import { unlink } from 'fs/promises';
import { join as joinPaths } from 'path';

export class IconsBuilder implements IBuilder {
  icons = {};
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
    await writeFile(url, result['data'], getIconsPublicPath(extra));
    this.icons[url] = {
      name: `${
        extra.options.extra.namespace
          ? `${extra.options.extra.namespace ?? ''}:`
          : ''
      }${slug.replace(/\//g, ':')}`,
      data: {
        url,
        lazy: true
      }
    };
  }

  async remove(filePath: string, extra: IMapperExtraOptions) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    const slug = cleanPath(filePath.replace(/\.svg$/, ''));
    const url = `${slug}.svg`;
    delete this.icons[url];
    await unlink(joinPaths(getIconsPublicPath(extra), url));
  }
}
