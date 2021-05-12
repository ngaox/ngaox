export interface routesSeoData {
    [key: string]: PageSeoData
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
    fbAppId?: string;
    siteName?: string;
}

export interface imageData {
    alt?: string;
    width?: number;
    height?: number;
    mimeType?: string;
}