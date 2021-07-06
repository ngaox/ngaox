import { AfterViewChecked } from '@angular/core';
import { Component } from '@angular/core';
import { HighlightService } from '../highlight.service';

@Component({
  selector: 'docs-main',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements AfterViewChecked {
  constructor(private highlightService: HighlightService) {}
  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
