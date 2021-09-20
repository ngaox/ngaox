import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import marked from 'marked';
import { TitleService } from '../../core/title.service';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<string> {
  constructor(private titleService: TitleService, private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return this.http
      .get<any>(`/.netlify/functions/doc-content/${route.paramMap.get('slug')}`)
      .pipe(
        map(docItem => {
          this.titleService.setTitle(docItem.name);
          return marked(docItem.content);
        })
      );
  }
}
