import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IDocsSection } from '@docs-core/models';
import { SortItemsCallback } from '@docs-core/data';

@Injectable({
  providedIn: 'root'
})
export class ContentsMapResolver implements Resolve<IDocsSection[]> {
  constructor(private http: HttpClient) {}

  resolve(): Observable<IDocsSection[]> {
    return this.http.get<IDocsSection[]>(`/~content/.content-map.json`).pipe(
      map(data =>
        data.sort(SortItemsCallback).map(section => ({
          ...section,
          items:
            section.items?.sort((a, b) => {
              return SortItemsCallback(
                {
                  name: a.name,
                  order: a.metadata.order
                },
                {
                  name: b.name,
                  order: b.metadata.order
                }
              );
            }) ?? []
        }))
      )
    );
  }
}
