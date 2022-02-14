import { Component } from '@angular/core';
import { DOCS_SECTIONS } from '@docs-core/data';
import { TitleService } from '../../../core/title.service';

@Component({
  selector: 'docs-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: any[] = DOCS_SECTIONS;

  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Categories');
  }
}
