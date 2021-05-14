import { NavigationEnd } from '@angular/router';
import { Injector } from '@angular/core';
import {
    PageSeoData,
    presetsLoader,
    routesSeoData,
    Loader
} from '@ngaox/seo';

export let  AppSeoLoader:Loader = (event: NavigationEnd,injector: Injector): PageSeoData => {
    // put your logic here
    // eg: using presets SeoData definitions
    let definitions:routesSeoData = {
        "/*": (event, injector) => {
            return {
                title: "GG"
            };
        },
        "/": { title: "Home" },
    };
    // PS: you can use fonction to get resolved data or call external APIs...
    return presetsLoader(event, injector, definitions);
}