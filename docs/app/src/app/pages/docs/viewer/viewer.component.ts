import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IDocsItem } from '@docs-core/models';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'docs-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  docsItem$?: Observable<IDocsItem>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1280px)')
    .pipe(
      map(result => {
        this.changeDetectorRef.detectChanges();
        return !result.matches;
      })
    );

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.docsItem$ = this.route.data.pipe(
      map(data => {
        document.querySelector('.viewer-scroll-container')?.scrollTo(0, 0);
        return data['docsItem'];
      })
    );
  }

  safeHtml(html?: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html ?? '');
  }
}
