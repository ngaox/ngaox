import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { IDocsSection } from '@docs-core/models';
import { ActivatedRoute } from '@angular/router';
import { DocsHeaderService } from '@docs-core/docs-header.service';

@Component({
  selector: 'docs-entry',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {
  pageHeader$ = this.headerService.getHeader().pipe(
    tap({
      next: () => this.changeDetector.detectChanges()
    })
  );
  sections$: Observable<IDocsSection[]> = this.route.data.pipe(
    map(data => data['contentsMap'])
  );
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1024px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private headerService: DocsHeaderService,
    private breakpointObserver: BreakpointObserver,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}
}
