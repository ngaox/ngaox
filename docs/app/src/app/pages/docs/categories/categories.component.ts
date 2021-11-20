import { Component } from '@angular/core';
import { SortedDocItems } from 'docs/docs-map';
import { TitleService } from '../../../core/title.service';
import { DocSection } from 'docs/models';

@Component({
  selector: 'docs-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: DocSection[] = SortedDocItems;

  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Categories');
  }
}
