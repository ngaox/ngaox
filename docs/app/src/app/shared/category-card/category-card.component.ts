import { Component, Input } from '@angular/core';
import { DocContentItem } from 'docs/models';

@Component({
  selector: 'docs-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: DocContentItem;
  constructor() {}
}
