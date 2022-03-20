import { IPressMapper } from '../index';
import { omitKeys } from '../utils/omit-keys';
import { IParsedContent, IDocsItem, IDocsSection } from './modals';

function getSlug(section?: IDocsSection, slug?: string, filePath?: string) {
  return `${section?.routesPrefix ?? ''}${
    slug ??
    filePath
      .replace(new RegExp(`^(${section?.directory ?? ''}/)`), '')
      .replace(/\..+$/, '') ??
    ''
  }`;
}

export function getDocsPressMapper(
  sections: IDocsSection[]
): IPressMapper<IDocsSection[], IDocsItem> {
  return {
    empty: sections,
    mapValues: async (curr, filePath: string, parsed: IParsedContent) => {
      const section = curr.find(
        section =>
          !section?.directory || filePath.startsWith(section?.directory + '/')
      );
      const { slug: rawSlug, ...metadata } = parsed.data;
      const slug = getSlug(section, rawSlug, filePath);
      const name =
        parsed.data.name ??
        (slug.replace(/-/g, ' ') as string).replace(/^\w/, c =>
          c.toUpperCase()
        );
      return [
        `${slug}.json`,
        {
          name: name,
          slug: slug,
          content: parsed.content,
          metadata: { ...metadata, filePath },
          toc: parsed.toc
        }
      ];
    },
    push: (previous, filePath, obj) => {
      const section = previous.find(
        sec => !sec?.directory || filePath.startsWith(sec?.directory + '/')
      );
      return [
        ...previous.filter(sec => sec !== section),
        {
          ...section,
          items: [
            ...(section?.items ?? []).filter(
              item => item.metadata.filePath !== filePath
            ),
            omitKeys(obj, ['content', 'toc']) as IDocsItem
          ]
        }
      ];
    },
    remove: (previous, filePath: string) => {
      let outFilePath: string;
      const section = previous.find(section =>
        section.items?.some(item => {
          if (item.metadata.filePath === filePath) {
            outFilePath = item.slug + '.json';
            return true;
          }
          return false;
        })
      );
      return [
        [
          ...previous.filter(sec => sec !== section),
          {
            ...section,
            items: section.items.filter(
              item => item.metadata.filePath !== filePath
            )
          }
        ],
        outFilePath
      ];
    }
  };
}
