import { DocsSections } from './docs-sections';
import { ProjectFeatures } from './project-features';

// TODO: Replace with real data
export const PROJECT = {
  name: 'Angular Ngaox',
  headline: 'Angular development is easier than ever!',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, rem dolor laborum aliquid voluptatibus molestias, inventore perferendis quam ipsam, tempora autem expedita cum. Explicabo neque laboriosam, adipisci aliquam dicta nobis.',
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
      ? 0
      : (a?.order ?? Infinity) < (b?.order ?? Infinity)
      ? -1
      : 1;
  const nameSort = a.name.localeCompare(a.name);
  // Cast return value to one of 0, 1, -1
  return orderSort || nameSort === 0 ? 0 : nameSort > 0 ? 1 : -1;
}
