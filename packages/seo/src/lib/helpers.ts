import { Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export function currentPageRoute(injector: Injector): ActivatedRoute {
  let route: ActivatedRoute = injector.get(ActivatedRoute);
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route;
}
