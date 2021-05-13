# Ngaox Seo

`@ngaox/seo` is an angular library to help generate & managing meta & other necessary tags that allow Social Media sharing & improve page seo ranking

**Important:** Generally you should use this library only if you are rendering you pages before page laod which can be done on the angular world using [Universal](https://angular.io/guide/universal) or [Scully](https://scully.io/) or any other way you prefer.

---

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Getting started](#getting-started)
    - [Set global defaults](#set-global-defaults)
    - [A cleaner & better way 👌](#a-cleaner--better-way-)
    - [Other helpful methods](#other-helpful-methods)
  - [License](#license)
  - [How can I support the project?](#how-can-i-support-the-project)

---

## Installation
To install this library with `npm` run:
```bash
npm install @ngaox/ceo --save
```
or using `yarn`
```bash
yarn add @ngaox/seo
```

---

## Usage
### Getting started
The `SeoService` is the service used to set page meta tags & title & canonical links.

The service is provided in the `root` module. So you need just to inject it wherever you need it.

and you can set page seo data by calling `set` of it method & passing your Data
```ts
// exemple.component.ts
import { SeoService } from '@ngaox/seo';
// ...
    let seoData: PageSeoData = {
        // your data ...
        // check PageSeoData interface below
    }
    constructor(seo: SeoService) {
        seo.set(seoData)
        // ...
    }
//...
```
the seoData given to `.set` method should be of type `PageSeoData` wich is:
```ts
export interface PageSeoData  {
    title?: string;
    keywords?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
    imageData?: {
        alt?: string;
        width?: number;
        height?: number;
        mimeType?: string;
    }; // imageData interface 
    twitterCreator?: string;
    fbAppId?: string;
    siteName?: string;
}
```
### Set global defaults
However you might want to set some default values for your app like `siteName`  or `twitterCreator` ...

thats can be done by importing `SeoModule` and calling `forRoot` method with your defaults values wich are also of type `PageSeoData`
```ts
// app.module.ts
// ...
import { SeoModule } from '@ngaox/seo';
// ...
@NgModule({
    /* ... */
    imports: [
        /* ... */
        SeoModule.forRoot({
            title: "React is garbage 😈",
            keywords: "1, 2, 3",
            type: "website",
            twitterCreator: "@twitter",
            siteName: "Cool app 😎"
            // ...
        })
    ],
    /* ... */
})
// ...
```
### A cleaner & better way 👌
Ngaox Seo v2 comes with support of **laoder** concept wich is a function that `SeoModule` call whenever navigating to route on the app & it pass it a `NavigationEnd` event.

**PS:** a laoder has to return `PageSeoData` object that will overwritte the given default for that specific route.

& here where comes the reel magic since we can seprate setting seo data for all pages from our components & also keep it all in one place (eg: `app.seo.ts`).

```ts
// app.seo.ts
import { NgModule } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { PageSeoData, routesSeoData, SeoModule } from '@ngaox/seo';

function myAppLaoder(event: NavigationEnd): PageSeoData {
    // put your logic here
    // eg: using presets SeoData definitions
    let definitions:routesSeoData = {
        "/": { /* ... */ },
        "/about": { /* ... */ },
        // you can use /* at the end to specify definition for all /user sub routes
        "/user/*": userLaoder() // you can also call functions to resolve route seoData
    };
    // dont forget to import presetsLaoder if you would use it 
    return presetsLaoder(event, definitions);
}

const SeoDefaults:PageSeoData = {
    title: "cool title 😎",
    // ...
};
@NgModule({
    imports: [ SeoModule.forRoot(SeoDefaults, myAppLaoder) ],
    exports: [ SeoModule ]
})
export class AppSeo { }

```
& the final touch is importing `AppSeo` in your `AppModule`
```ts
// app.module.ts
@NgModule({
    // ...
    imports: [
        AppSeo
        // ...
    ]
})
```

### Other helpful methods
`SeoService` comes with varied setter methods, used in the `set` method to set individual `PageSeoData` property meta tags.
For exemple `setTitle(title: string)` will set title related meta tags wich are:
- title tag: `<title></title>`
- Meta tags: `meta[property='og:title']` - `meta[name='twitter:title']` & `meta[name='title']`

& also comes with a method `generateTags` to create/update meta tags for a given `MetaDefinition` array to generate non supported meta tags

---

## License
This project is licensed under the terms of the [MIT License](LICENSE)

---

## How can I support the project?

- Star the GitHub repo ⭐
- Create pull requests, submit bugs, suggest new features ...
- Follow me on [Twitter](https://twitter.com/rabraghib)


---

<p align="center">Made with ❤️ by <a href="https://www.rabraghib.me">Rabyâ Raghib</a></p>