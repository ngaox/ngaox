import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { DocsHeaderService } from '@docs-core/docs-header.service';
import { IDocsItem, PressService } from '@ngaox/press';

@Injectable({
  providedIn: 'root'
})
export class DocsItemResolver implements Resolve<IDocsItem> {
  constructor(
    private headerService: DocsHeaderService,
    private http: HttpClient,
    private router: Router,
    private press: PressService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocsItem> {
    const slug = route.paramMap.get('slug') ?? '';
    const url = this.press.getDocPath('docs', `${slug}.json`);
    return this.http.get<IDocsItem>(url).pipe(
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
