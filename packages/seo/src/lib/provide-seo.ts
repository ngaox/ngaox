import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  Provider,
  provideEnvironmentInitializer
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from './seo.service';
import { RouteDataSeoLoader, SeoDataLoader } from './loaders';
import { currentPageRoute } from './shared/helpers';
import { IPageSeoData, SeoDefaultsToken } from './shared/models';

export const enum SeoFeatureType {
  SeoDefaultsFeature,
  RouterLoaderFeature
}

export interface NgaoxSeoFeature {
  type: SeoFeatureType;
  providers: Array<Provider | EnvironmentProviders>;
}

export function provideNgaoxSeo(
  ...features: NgaoxSeoFeature[]
): EnvironmentProviders {
  return makeEnvironmentProviders([SeoService, features.map(f => f.providers)]);
}

// Seo Defaults Feature
export function withSeoDefaults(defaults: IPageSeoData): NgaoxSeoFeature {
  return {
    type: SeoFeatureType.SeoDefaultsFeature,
    providers: [
      {
        provide: SeoDefaultsToken,
        useValue: defaults
      }
    ]
  };
}

// Router Loader Feature
export function withRouterLoader(): NgaoxSeoFeature {
  return {
    type: SeoFeatureType.RouterLoaderFeature,
    providers: [
      {
        provide: SeoDataLoader,
        useClass: RouteDataSeoLoader
      },
      provideEnvironmentInitializer(initializeSeoRouterListener)
    ]
  };
}

function initializeSeoRouterListener() {
  const Loader = inject(SeoDataLoader);
  const router = inject(Router);
  const route = inject(ActivatedRoute);
  const seo = inject(SeoService);

  if (Loader) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        seo.set(Loader.resolve(currentPageRoute(route).snapshot));
      });
  }
}
