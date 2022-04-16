import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IDocsItem } from '@docs-core/models';
import { DocsHeaderService } from '@docs-core/docs-header.service';

@Injectable({
  providedIn: 'root'
})
export class DocsItemResolver implements Resolve<IDocsItem> {
  constructor(
    private headerService: DocsHeaderService,
    private http: HttpClient
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocsItem> {
    const slug = route.paramMap.get('slug');
    return this.http.get<IDocsItem>(`/~content/${slug}.json`).pipe(
      map(docItem => {
        this.headerService.setHeader(docItem.metadata['title'] ?? docItem.name);
        docItem.toc = docItem?.toc?.filter(
          i => i.level === 'h2' || i.level === 'h3'
        );
        return docItem;
      })
    );
  }
}
