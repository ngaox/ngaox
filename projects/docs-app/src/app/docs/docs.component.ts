import { AfterViewChecked, Component } from '@angular/core';
import { HighlightService } from './highlight.service';

@Component({
  selector: 'docs-docs',
  template: ` <p>docs works!</p> `,
  styles: [``]
})
export class DocsComponent implements AfterViewChecked {
  constructor(private highlightService: HighlightService) {}

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
