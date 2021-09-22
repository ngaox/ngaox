import { DocItem } from './app/src/app/core/interfaces';
import { DocItems, DocContentItem } from './docs-content';

export const SortedDocItems: DocContentItem[] = DocItems.sort((a, b) => {
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

export const NavbarDocItems: DocItem[] = SortedDocItems.map(
  (item: DocContentItem) => {
    return {
      name: item.name,
      slug: item.slug
    };
  }
);
