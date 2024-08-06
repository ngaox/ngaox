import { ModuleWithProviders, NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SeoService } from './seo.service';
import { RouteDataSeoLoader, SeoDataLoader } from './loaders';

import { currentPageRoute } from './shared/helpers';
import { IPageSeoData, SeoDefaultsToken } from './shared/models';

@NgModule({
  imports: [],
  providers: [
    {
      provide: SeoDataLoader,
      useClass: RouteDataSeoLoader
    }
  ],
  exports: []
})
export class SeoModule {
  constructor(
    Loader: SeoDataLoader,
    router: Router,
    route: ActivatedRoute,
    seo: SeoService
  ) {
    if (Loader) {
      router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          seo.set(Loader.resolve(currentPageRoute(route).snapshot));
        });
    }
  }

  public static forRoot(
    defaults: IPageSeoData = {
      title: '📝 Default NgaoxSeo Title - Change me!'
    }
  ): ModuleWithProviders<SeoModule> {
    return {
      ngModule: SeoModule,
      providers: [
        SeoService,
        {
          provide: SeoDefaultsToken,
          useValue: defaults
        }
      ]
    };
  }
}
