import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DocItem } from '../../core/interfaces';
import { NavbarDocItems } from 'docs/docs-map';
import { TitleService } from '../../core/title.service';

@Component({
  selector: 'docs-entry',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  pageTitle = this.titleService.getTitle();
  docItemsList: DocItem[] = NavbarDocItems;

  constructor(
    private titleService: TitleService,
    private breakpointObserver: BreakpointObserver
  ) {}
}
