import { AfterViewChecked, Component } from '@angular/core';
import { HighlightService } from '../../highlight.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DocItem } from '../../interfaces';

@Component({
  selector: 'docs-entry',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements AfterViewChecked {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  docItemsList: DocItem[] = [
    {
      name: 'Getting Started',
      slug: 'getting-started'
    }
  ];

  constructor(
    private highlightService: HighlightService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
