import { NavigationEnd } from "@angular/router";
import { PageSeoData, routesSeoData } from "./interfaces";

export function presetsLaoder(e: NavigationEnd, routesSeoData: routesSeoData):PageSeoData
{
    return routesSeoData[e.url] || {};
}