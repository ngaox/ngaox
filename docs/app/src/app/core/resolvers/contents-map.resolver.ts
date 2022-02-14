import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IDocsSection } from '@docs-core/models';

@Injectable({
  providedIn: 'root'
})
export class ContentsMapResolver implements Resolve<IDocsSection> {
  constructor(private http: HttpClient) {}

  resolve(): Observable<IDocsSection> {
    return this.http.get<IDocsSection>(`/content/docs-contents-map.json`);
  }
}
