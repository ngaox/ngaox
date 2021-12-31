import { Injector } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Loader, PageSeoData, routesSeoData } from './interfaces';

export function presetsLoader(
  event: NavigationEnd,
  injector: Injector,
  routesSeoData: routesSeoData
): PageSeoData {
  const resultsKeys = Object.keys(routesSeoData).filter(path => {
    path = noLastSlash(path);
    const url = noLastSlash(event.urlAfterRedirects.split('?')[0]);
    if (path.endsWith('/*')) {
      return url.startsWith(path.slice(0, -2));
    } else {
      return path === url;
    }
  });
  const dataKey = resultsKeys[resultsKeys.length - 1];
  if (typeof routesSeoData[dataKey] === 'function') {
    const loader: Loader = routesSeoData[dataKey] as Loader;
    return loader(event, injector);
  }
  return routesSeoData[dataKey] as PageSeoData;
}

function noLastSlash(url: string) {
  if (url.length > 1 && url[url.length - 1] == '/') {
    return url.slice(0, -1);
  }
  return url;
}
