import { ModuleWithProviders, NgModule } from '@angular/core';
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
    
    public static forRoot(defaults: PageSeoData = {}): ModuleWithProviders<SeoModule>
    {
        return {
            ngModule: SeoModule,
            providers: [
                SeoService,
                {
                    provide: 'Defaults',
                    useValue: defaults
                }
            ]
        };
    }
}
