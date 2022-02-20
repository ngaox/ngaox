import { ModuleWithProviders, NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SeoService } from './seo.service';
import { RouteDataSeoLoader, SeoDataLoader } from './loaders';

import { currentPageRoute } from './shared/helpers';
import { IPageSeoData, SeoDefaultsToken } from './shared/modals';
import { SeoComponent } from './seo.component';

@NgModule({
  declarations: [SeoComponent],
  imports: [],
  providers: [
    {
      provide: SeoDataLoader,
      useClass: RouteDataSeoLoader
    }
  ],
  exports: [SeoComponent]
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
      title: 'This title is everywhere 🤔? Set yours!!'
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
