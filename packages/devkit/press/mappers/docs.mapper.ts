import { IPressMapper } from '../../src/builders';
import { unlinkFile, writeFile } from '../../src/utils';
import { pressMaps } from '../constants';
import { IDocsSection } from '../models/docs';
import { IParsedContent } from '../models/generic';

export function getDocsMapper(sections: IDocsSection[]): IPressMapper {
  const getSection = (filePath: string) => {
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
  };

  const memory = {};
  return {
    push: async (parsed: IParsedContent, filePath: string, extra) => {
      const section = getSection(filePath);
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

      await writeFile(
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
      await writeFile(pressMaps.main, sections, {
        dir: extra.outputPath
      });
    },
    remove: async (filePath: string, extra) => {
      const section = getSection(filePath);
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
      await writeFile(pressMaps.main, memory, {
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
      .replace(/\..+$/, '') ??
    ''
  }`;
}
