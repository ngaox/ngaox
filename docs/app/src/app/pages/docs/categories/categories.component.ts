import { Component } from '@angular/core';
import { DOCS_SECTIONS } from '@docs-core/data';
import { DocsHeaderService } from '@docs-core/docs-header.service';
import { IDocsSection } from '@docs-core/models';

@Component({
  selector: 'docs-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: IDocsSection[] = DOCS_SECTIONS;

  constructor(private headerService: DocsHeaderService) {
    this.headerService.setHeader('Sections List');
  }
}
