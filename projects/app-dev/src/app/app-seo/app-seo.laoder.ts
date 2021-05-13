import { NavigationEnd } from '@angular/router';
import { Injector } from '@angular/core';
import {
    PageSeoData,
    presetsLaoder,
    routesSeoData
} from '@ngaox/seo';

export function AppSeoLaoder(event: NavigationEnd,injector: Injector): PageSeoData {
    // put your logic here
    // eg: using presets SeoData definitions
    let definitions:routesSeoData = {
        "/*": {
            title: "Unknown 🤒: " + event.urlAfterRedirects
        },
        "/": { title: "Home" }
    };
    // PS: you can use fonction to get resolved data or call external APIs...
    return presetsLaoder(event, definitions);
}