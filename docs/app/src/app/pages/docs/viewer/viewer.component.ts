import { AfterViewChecked, Component } from '@angular/core';
import { HighlightService } from '../../../core/highlight.service';
import { TitleService } from '../../../core/title.service';

@Component({
  selector: 'docs-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements AfterViewChecked {
  constructor(
    private highlightService: HighlightService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('sdd');
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
