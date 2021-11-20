import { Pipe, PipeTransform } from '@angular/core';
import { DocContentItem, DocParentSection, DocSection } from 'docs/models';

@Pipe({
  name: 'DocSection'
})
export class DocSectionPipe implements PipeTransform {
  transform(value: DocSection, type: 'item'): DocContentItem;
  transform(value: DocSection, type: 'collection'): DocParentSection;
  transform(
    value: DocSection,
    type: 'item' | 'collection' = 'item'
  ): DocSection | null {
    if (type === 'item' && 'slug' in value) {
      return value as DocContentItem;
    }
    if (type === 'collection' && 'items' in value) {
      return value as DocParentSection;
    }
    return null;
  }
}
