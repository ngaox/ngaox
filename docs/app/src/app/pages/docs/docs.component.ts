import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { TitleService } from '../../core/title.service';
import { SortedDocItems } from 'docs/docs-map';
import { DocSection } from 'docs/models';

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
  pageTitle = this.titleService.getTitle().pipe(
    tap({
      next: () => this.changeDetector.detectChanges()
    })
  );
  docSectionsList: DocSection[] = SortedDocItems;

  constructor(
    private titleService: TitleService,
    private breakpointObserver: BreakpointObserver,
    private changeDetector: ChangeDetectorRef
  ) {}
}
