import { CONTENT_MAP_FILE } from '../../models/constants';
import { IDocsSection } from '../../models/builders/docs';
import { IParsedContent } from '../../models/builders/generic';
import { unlinkFile, writeJSON } from '../../utils/filesystem';
import { getTaskOutputPath } from '../helpers/filesystem';
import { IBuilder, IMapperExtraOptions } from '../../models/builder';
import { getCleanRelative } from '../../utils/generators-options';

export class DocsBuilder implements IBuilder {
  memory = {};
  unknownIndex: number | undefined;

  constructor(private sections: IDocsSection[]) {}

  async push(
    parsed: IParsedContent,
    filePath: string,
    extra: IMapperExtraOptions
  ) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    const section = this.getSection(this.sections, filePath);
    const { slug: rawSlug, ...metadata } = parsed.data;
    const slug = this.getSlug(section, rawSlug as string, filePath);
    const name =
      parsed.data.name ??
      (slug.replace(/-/g, ' ') as string).replace(/^\w/, c => c.toUpperCase());

    this.memory[filePath] = {
      name: name,
      slug: slug,
      metadata: metadata
    };
    section.items = section?.items ?? [];

    const itemIndex = section.items.findIndex(item => item.slug === slug);
    if (itemIndex > -1) {
      section.items[itemIndex] = this.memory[filePath];
    } else {
      section.items.push(this.memory[filePath]);
    }

    const outputPath = getTaskOutputPath(extra);
    await writeJSON(
      `${slug}.json`,
      {
        ...this.memory[filePath],
        content: parsed.content,
        toc: parsed.toc
      },
      outputPath
    );
    await writeJSON(CONTENT_MAP_FILE, this.sections, outputPath);
  }

  async remove(filePath: string, extra: IMapperExtraOptions) {
    const section = this.getSection(this.sections, filePath);
    const slug = this.memory?.[filePath]?.slug;
    const itemIndex =
      slug !== undefined
        ? section.items.findIndex(
            item => item.slug === this.memory?.[filePath]?.slug
          )
        : -1;
    if (itemIndex < 0) return;
    delete section.items[itemIndex];
    delete this.memory[filePath];
    await unlinkFile(`${slug}.json`, extra.outputPath);
    await writeJSON(CONTENT_MAP_FILE, this.memory, getTaskOutputPath(extra));
  }

  getSlug(section?: IDocsSection, slug?: string, filePath?: string) {
    return `${section?.routesPrefix ?? ''}${
      slug ??
      filePath
        .replace(new RegExp(`^(${section?.directory ?? ''}/)`), '')
        .replace(/\.[^/.]+$/, '') ??
      ''
    }`;
  }

  getSection(sections: IDocsSection[], filePath: string) {
    const section = sections.find(
      sec => !sec?.directory || filePath.startsWith(sec?.directory + '/')
    );
    if (!section && this.unknownIndex === undefined) {
      this.unknownIndex = sections.push({
        name: 'unknown items..',
        routesPrefix: '--unknown--',
        directory: ''
      });
    }
    return section ?? sections[this.unknownIndex];
  }
}
