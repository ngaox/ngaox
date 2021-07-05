import { Inject, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Loader, PageSeoData } from './interfaces';
import { SeoService } from './seo.service';

const EXPORTS: any = [];

@NgModule({
  declarations: [...EXPORTS],
  imports: [],
  providers: [
    {
      provide: 'AutoLoader',
      useValue: undefined
    }
  ],
  exports: [...EXPORTS]
})
export class SeoModule {
  constructor(
    @Inject('AutoLoader') AutoLoader: Loader | null = null,
    injector: Injector,
    router: Router,
    seo: SeoService
  ) {
    if (AutoLoader) {
      router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(
          // @ts-ignore
          (event: NavigationEnd) => {
            seo.set(AutoLoader(event, injector));
          }
        );
    }
  }

  public static forRoot(
    defaults: PageSeoData = {},
    AutoLoader?: Loader
  ): ModuleWithProviders<SeoModule> {
    return {
      ngModule: SeoModule,
      providers: [
        SeoService,
        {
          provide: 'Defaults',
          useValue: defaults
        },
        {
          provide: 'AutoLoader',
          useValue: AutoLoader
        }
      ]
    };
  }
}
