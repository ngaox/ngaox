import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { DocsHeaderService } from '@docs-core/docs-header.service';
import { IDocsItem } from '@ngaox/press';

@Injectable({
  providedIn: 'root'
})
export class DocsItemResolver implements Resolve<IDocsItem> {
  constructor(
    private headerService: DocsHeaderService,
    private http: HttpClient,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocsItem> {
    const slug = route.paramMap.get('slug') ?? '';
    return this.http.get<IDocsItem>(`/~content/${slug}.json`).pipe(
      map(docItem => {
        this.headerService.setHeader(docItem.metadata['title'] ?? docItem.name);
        docItem.toc = docItem?.toc?.filter(
          i => i.level === 'h2' || i.level === 'h3'
        );
        return docItem;
      }),
      catchError(() => {
        this.router.navigateByUrl('/docs');
        return of({
          name: '---No Found---',
          slug: slug,
          metadata: []
        });
      })
    );
  }
}
