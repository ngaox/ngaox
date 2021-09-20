import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HighlightService } from '../../../core/highlight.service';
import { TitleService } from '../../../core/title.service';
import marked from 'marked';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'docs-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements AfterViewChecked, OnInit {
  content$?: Observable<string>;

  constructor(
    private highlightService: HighlightService,
    private titleService: TitleService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.content$ = this.route.params.pipe(
      mergeMap(params =>
        this.http.get<any>(`/.netlify/functions/doc-content/${params.slug}`)
      ),
      map(docItem => {
        this.titleService.setTitle(docItem.name);
        return marked(docItem.content);
      })
    );
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
