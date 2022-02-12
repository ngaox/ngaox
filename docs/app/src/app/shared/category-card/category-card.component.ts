import { Component, Input } from '@angular/core';
import { IDocsSection } from '@docs-core/models';

@Component({
  selector: 'docs-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category?: IDocsSection;
}
