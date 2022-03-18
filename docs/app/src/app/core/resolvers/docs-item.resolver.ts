import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
      tap(docItem => {
        this.headerService.setHeader(docItem.name);
      })
    );
  }
}
