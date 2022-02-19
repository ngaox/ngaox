import { DocsSections } from './docs-sections';
import { ProjectFeatures } from './project-features';

export const PROJECT = {
  name: 'Angular Ngaox',
  headline: 'Angular development is easier than ever!',
  description:
    'Ngaox is a collection of Angular components and utilities designed to make your life easier. We mainly aim at providing solutions for common web needs that are still missing from Angular, such as inlining SVGs, SEO management, and more.',
  features: ProjectFeatures
};

export const DOCS_SECTIONS = DocsSections.sort(SortItemsCallback);

interface ISortable {
  name: string;
  order?: number;
}

export function SortItemsCallback(a: ISortable, b: ISortable) {
  const orderSort =
    a?.order === b?.order
      ? undefined
      : (a?.order ?? Infinity) < (b?.order ?? Infinity)
      ? -1
      : 1;
  const nameSort = a.name.localeCompare(b.name);
  return orderSort ?? (nameSort === 0 ? 0 : nameSort > 0 ? 1 : -1);
}
