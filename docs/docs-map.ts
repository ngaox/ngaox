import { DocItems } from './docs-content';
import { DocContentItem, DocItemType, DocSection } from './models';

// TODO: update sorting (fix & implement type sorting)
export const SortedDocItems: DocSection[] = BuildDocSections(DocItems);

function BuildDocSections(items: DocContentItem[]): DocSection[] {
  let result: DocSection[] = [
    ...SortDocItems(DocItems.filter(item => !item.type))
  ];
  Object.keys(DocItemType).forEach(key => {
    let type = DocItemType[key as keyof typeof DocItemType];
    let section = {
      name: type,
      items: DocItems.filter(item => item.type === type)
    };
    if (section.items.length > 0) {
      result.push(section);
    }
  });
  return result;
}

function SortDocItems(items: DocContentItem[]): DocContentItem[] {
  return items.sort((a, b) => {
    const priorityA = a.priority || 0,
      priorityB = b.priority || 0;
    const nameA = a.name || 0,
      nameB = b.name || 0;
    return priorityA !== priorityB
      ? priorityA > priorityB
        ? -1
        : 1
      : nameA !== nameB
      ? nameA > nameB
        ? 1
        : -1
      : 0;
  });
}
