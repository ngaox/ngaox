---
name: SEO & Social Sharing
title: Mange your Seo and Social-Media previews
---

## Available SEO Options

the SeoData given should be of type `IPageSeoData` which is:

```ts
interface IPageSeoData {
  title?: string;
  keywords?: string;
  description?: string;
  url?: string;
  type?: string;
  image?:
    | string
    | {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
        mimeType?: string;
      };
  twitter?: {
    site?: string;
    creator?: string;
    card?: 'summary_large_image' | 'summary';
  };
  fbAppId?: string;
  siteName?: string;
}
```
