import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IDocsSection } from '@docs-core/models';
import { PressService } from '@ngaox/press';

@Injectable({
  providedIn: 'root'
})
export class ContentsMapResolver implements Resolve<IDocsSection[]> {
  constructor(private http: HttpClient, private press: PressService) {}

  resolve(): Observable<IDocsSection[]> {
    const url = this.press.getContentMapPath('docs');
    return this.http.get<IDocsSection[]>(url).pipe(
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

interface ISortable {
  name: string;
  order?: number;
}

function SortItemsCallback(a: ISortable, b: ISortable) {
  const orderSort =
    a?.order === b?.order
      ? undefined
      : (a?.order ?? Infinity) < (b?.order ?? Infinity)
      ? -1
      : 1;
  const nameSort = a.name.localeCompare(b.name);
  return orderSort ?? (nameSort === 0 ? 0 : nameSort > 0 ? 1 : -1);
}
