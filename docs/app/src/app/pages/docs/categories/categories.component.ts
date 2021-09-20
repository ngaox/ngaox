import { Component } from '@angular/core';
import { TitleService } from '../../../core/title.service';

@Component({
  selector: 'docs-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Categories');
  }
}
