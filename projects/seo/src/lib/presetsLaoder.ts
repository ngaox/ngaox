import { NavigationEnd } from "@angular/router";
import { PageSeoData, routesSeoData } from "./interfaces";

export function presetsLaoder(event: NavigationEnd, routesSeoData: routesSeoData): PageSeoData
{
    let resultsKeys = Object.keys(routesSeoData).filter(path => {
        path = noLastSlash(path);
        let url = noLastSlash(
            event.urlAfterRedirects.split("?")[0]
        );
        if (path.endsWith("/*")) {
            return url.startsWith(path.slice(0, -2));
        } else {
            return path === url;
        }
    });
    let dataKey = resultsKeys[resultsKeys.length - 1];
    return routesSeoData[dataKey]
}

function noLastSlash(url: string) {
    if (url.length > 1 && url[url.length - 1] == "/") {
        return url.slice(0, -1);
    }
    return url;
}