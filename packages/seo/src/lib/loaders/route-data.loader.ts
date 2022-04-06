import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, PRIMARY_OUTLET } from '@angular/router';
import { IPageSeoData, ISeoLoader, SeoKey } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class RouteDataSeoLoader implements ISeoLoader {
  resolve(snapshot: ActivatedRouteSnapshot): IPageSeoData {
    let seoData: IPageSeoData | undefined;
    let route: ActivatedRouteSnapshot | undefined = snapshot.root;
    while (route !== undefined) {
      seoData = route.data[SeoKey] ?? seoData;
      route = route.children.find(child => child.outlet === PRIMARY_OUTLET);
    }
    return seoData ?? {};
  }
}
