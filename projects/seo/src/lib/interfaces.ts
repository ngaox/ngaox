import { Injector } from "@angular/core";
import { NavigationEnd } from "@angular/router";

export type Loader = (event: NavigationEnd,Injector: Injector) => PageSeoData;

export interface routesSeoData {
    [key: string]: PageSeoData|Loader
};

export interface PageSeoData  {
    title?: string;
    keywords?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
    imageData?: imageData;
    twitterCreator?: string;
    twitterCard?: "summary_large_image" | "summary";
    fbAppId?: string;
    siteName?: string;
}

export interface imageData {
    alt?: string;
    width?: number;
    height?: number;
    mimeType?: string;
}