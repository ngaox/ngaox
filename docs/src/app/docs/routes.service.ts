import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NavRoute extends ScullyRoute {
  content: ScullyRoute[];
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  constructor() {}

  docsRouesSections(): NavRoute[] {
    return [
      {
        title: 'Ngaox Seo',
        route: '/docs/seo',
        content: []
      },
      {
        title: 'Padup Design',
        route: '/docs/padup',
        content: []
      }
    ];
  }

  docsRoutesList(links$: Observable<ScullyRoute[]>): Observable<NavRoute[]> {
    return links$.pipe(
      map(links => {
        const sections: NavRoute[] = this.docsRouesSections();
        sections.forEach((section, i: number) => {
          sections[i].content = links.filter((route: ScullyRoute) =>
            route.route.startsWith(`${section.route}/`)
          );
        });
        return sections;
      })
    );
  }
}
