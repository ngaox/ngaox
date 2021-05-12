import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PageSeoData } from './interfaces';
import { SeoService } from './seo.service';

const EXPORTS = [];

@NgModule({
    declarations: [
        ...EXPORTS
    ],
    imports: [],
    exports: [
        ...EXPORTS
    ]
})
export class SeoModule {

    constructor(@Inject("AutoLaoder") AutoLaoder: Function = null,router: Router,seo: SeoService) {
        if (AutoLaoder) {
            router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe(
                (e: NavigationEnd) => {
                    seo.set(AutoLaoder(e));
                }
            );
        }
    }
    
    public static forRoot(defaults: PageSeoData = {},AutoLaoder?:Function): ModuleWithProviders<SeoModule>
    {
        return {
            ngModule: SeoModule,
            providers: [
                SeoService,
                {
                    provide: 'Defaults',
                    useValue: defaults
                },
                {
                    provide: 'AutoLaoder',
                    useValue: AutoLaoder
                }
            ]
        };
    }
}
