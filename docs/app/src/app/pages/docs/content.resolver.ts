import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as marked from 'marked';
import { TitleService } from '../../core/title.service';
import { DataService } from '../../core/data.service';
import { DocContentItem } from 'docs/models';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<string> {
  constructor(
    private titleService: TitleService,
    private http: HttpClient,
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const slug = route.paramMap.get('slug');
    return this.http.get<any>(`/api/doc-content?slug=${slug}`).pipe(
      map(docItem => {
        this.dataService.setCurrentDocSection({
          name: docItem?.name,
          type: docItem?.type,
          slug: slug
        } as DocContentItem);
        this.titleService.setTitle(docItem.name);
        return marked(docItem.content);
      })
    );
  }
}
