import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'docs-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewerComponent implements OnInit {
  content$?: Observable<SafeHtml>;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.content$ = this.route.data.pipe(
      map(data =>
        this.sanitizer.bypassSecurityTrustHtml(data['content'].content)
      )
    );
  }
}
