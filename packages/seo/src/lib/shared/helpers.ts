import { ActivatedRoute } from '@angular/router';

export function currentPageRoute(route: ActivatedRoute): ActivatedRoute {
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route;
}
