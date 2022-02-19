import { ActivatedRouteSnapshot } from '@angular/router';
import { IPageSeoData, ISeoLoader } from '../shared/modals';

export * from './route-data.loader';

export abstract class SeoDataLoader implements ISeoLoader {
  abstract resolve(route: ActivatedRouteSnapshot): IPageSeoData;
}
