import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TitleService } from '../title.service';
import { DataService } from '../data.service';
import { IDocsItem } from '@docs-core/models';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<IDocsItem> {
  constructor(
    private titleService: TitleService,
    private http: HttpClient,
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocsItem> {
    const slug = route.paramMap.get('slug');
    return this.http.get<IDocsItem>(`/content/${slug}.json`).pipe(
      tap(docItem => {
        this.dataService.setCurrentDocsItem(docItem);
        this.titleService.setTitle(docItem.name);
      })
    );
  }
}
