import { NgModule } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { PageSeoData, presetsLaoder, routesSeoData, SeoModule } from '@ngaox/seo';

function myAppLaoder(event: NavigationEnd): PageSeoData {
    // put your logic here
    // eg: using presets SeoData definitions
    let definitions:routesSeoData = {
        "/*": { title: "Home" /* ... */ },
        "/about": { /* ... */ }
    };
    // dont forget to import presetsLaoder if you would use it 
    return presetsLaoder(event, definitions);
}

const SeoDefaults = {
    title: "🧪🤖",
    // ...
};
@NgModule({
    imports: [
        SeoModule.forRoot(SeoDefaults, myAppLaoder)
    ],
    exports: [
        SeoModule
    ]
})
export class AppSeo { }
