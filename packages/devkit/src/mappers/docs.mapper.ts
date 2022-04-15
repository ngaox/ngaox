import { IPressMapper } from '../../src/builders';
import { unlinkFile, writeJSON } from '../../src/utils/filesystem';
import { MAP_FILES } from '../models/constants';
import { IDocsSection } from '../models/mappers/docs';
import { IParsedContent } from '../models/mappers/generic';

const memory = {};

export function getDocsMapper(sections: IDocsSection[]): IPressMapper {
  return {
    push: async (parsed: IParsedContent, filePath: string, extra) => {
      const section = getSection(sections, filePath);
      const { slug: rawSlug, ...metadata } = parsed.data;
      const slug = getSlug(section, rawSlug as string, filePath);
      const name =
        parsed.data.name ??
        (slug.replace(/-/g, ' ') as string).replace(/^\w/, c =>
          c.toUpperCase()
        );

      memory[filePath] = {
        name: name,
        slug: slug,
        metadata: metadata
      };

      section.items = section.items ?? [];

      const itemIndex = section.items.findIndex(item => item.slug === slug);
      if (itemIndex > -1) {
        section.items[itemIndex] = memory[filePath];
      } else {
        section.items.push(memory[filePath]);
      }

      await writeJSON(
        `${slug}.json`,
        {
          ...memory[filePath],
          content: parsed.content,
          toc: parsed.toc
        },
        {
          dir: extra.outputPath,
          logger: extra.context.logger
        }
      );
      await writeJSON(MAP_FILES.main, sections, {
        dir: extra.outputPath
      });
    },
    remove: async (filePath: string, extra) => {
      const section = getSection(sections, filePath);
      const slug = memory?.[filePath]?.slug;
      const itemIndex =
        slug !== undefined
          ? section.items.findIndex(
              item => item.slug === memory?.[filePath]?.slug
            )
          : -1;

      if (itemIndex < 0) return;

      delete section.items[itemIndex];
      delete memory[filePath];
      await unlinkFile(`${slug}.json`, {
        dir: extra.outputPath,
        logger: extra.context.logger
      });
      await writeJSON(MAP_FILES.main, memory, {
        dir: extra.outputPath
      });
    }
  };
}

function getSlug(section?: IDocsSection, slug?: string, filePath?: string) {
  return `${section?.routesPrefix ?? ''}${
    slug ??
    filePath
      .replace(new RegExp(`^(${section?.directory ?? ''}/)`), '')
      .replace(/\.[^/.]+$/, '') ??
    ''
  }`;
}

function getSection(sections: IDocsSection[], filePath: string) {
  const section = sections.find(
    sec => !sec?.directory || filePath.startsWith(sec?.directory + '/')
  );
  let unknownIndex: number | undefined;
  if (!section) {
    unknownIndex = sections.push({
      name: 'unknown items..',
      routesPrefix: '--unknown--',
      directory: ''
    });
  }
  return section ?? sections[unknownIndex];
}
