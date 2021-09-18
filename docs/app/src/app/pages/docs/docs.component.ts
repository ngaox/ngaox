import { AfterViewChecked, Component } from '@angular/core';
import { HighlightService } from '../../highlight.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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

  constructor(
    private highlightService: HighlightService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
