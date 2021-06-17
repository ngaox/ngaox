# Ngaox Seo

`@ngaox/seo` is an angular library to help generate & managing meta & other necessary tags that allow Social Media sharing & improve page seo ranking

**Important:** Generally you should use this library only if you are rendering you pages before page laod which can be done on the angular world using [Universal](https://angular.io/guide/universal) or [Scully](https://scully.io/) or any other way you prefer.

---

# Table of Contents

- [Ngaox Seo](#ngaox-seo)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Getting started](#getting-started)
  - [Only want a service?](#only-want-a-service)
  - [Set global defaults](#set-global-defaults)
  - [Loaders](#loaders)
    - [How to handle Dynamic routes SEO](#how-to-handle-dynamic-routes-seo)
  - [Other helpful methods](#other-helpful-methods)

---

# Installation

To install this library with `npm` run:

```bash
npm install @ngaox/ceo --save
```

or using `yarn`

```bash
yarn add @ngaox/seo
```

---

# Usage

## Getting started

To setup the Ngaox Seo in your application run the following CLI command:

```bash
ng generate @ngaox/seo:setup
```

make sure to firstly check `ng generate @ngaox/seo:setup --help` to see all possible args & params...

**And you good to go 🎉** you should see the title changed for all routes

The previous command did update your module to import the generated SeoModule? if not you can add it yoursel.

```ts
// app.module.ts

import { AppSeoModule } from 'app-seo/app-seo.module.ts'; // the generated SeoModule
/* ... */
@NgModule({
    imports: [
        AppSeoModule
        /* ... */
    ],
    /* ... */
})
```

Dont foget to Edit `AppSeoDefaults` in the generated file `app-seo/app-seo.defaults.ts` & define default SeoData (page infos)

& also update the pre given [loader](#loaders) `AppSeoLoader` from `app-seo/app-seo.loader.ts` to laod `SeoData` for the current route (will overwrite your defaults for that route)

**PS: Where & how these files named may deffer for you depend on the used command options**

## Only want a service?

The `SeoService` is the service used to set page meta tags & title & canonical links.

The service is provided in the `root` module. So you need just to inject it wherever you need it.

and you can set page `SeoData` by calling `set` method of it & passing it your Data

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

the SeoData given to `.set` method should be of type `PageSeoData` wich is:

```ts
export interface PageSeoData {
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
  twitterCard?: 'summary_large_image' | 'summary';
  fbAppId?: string;
  siteName?: string;
}
```

## Set global defaults

You might want to set some default values for your app like `siteName` or `twitterCreator` ...

thats can be done by importing `SeoModule` and calling `forRoot` method with your defaults values ass its first argument wich are also of type `PageSeoData`

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

## Loaders

Ngaox Seo comes with support of **loader** concept wich is a function that `SeoModule` call whenever navigating to route on the app & it pass it a `NavigationEnd` event & an `Injector` and expect `PageSeoData` object to be returned that represent the SeoData for the current page.

```ts
import { Injector } from '@angular/core';
import { NavigationEnd } from '@angular/router';

// Loader Type
export type Loader = (event: NavigationEnd, Injector: Injector) => PageSeoData;
```

To use just create it and pass it as a second argument for `SeoModule.forRoot` function

```ts
// app.module.ts
import { Injector } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { PageSeoData, Loader } from '@ngaox/seo';

let myLoader:Loader = (event: NavigationEnd, injector:Injectot) :PageSeoData => {/* ... */}

@NgModule({
    imports: [
        SeoModule.forRoot({ /* ... */},myLoader)
        /* ... */
    ],
    /* ... */
})
```

If you used the `ng generate @ngaox/seo:setup` it will generate a loader for you & make it use with a preset of routes definitions.

### How to handle Dynamic routes SEO

as montined above the `loader` get an [injactor](https://angular.io/api/core/Injector-0) that can inject any injectabale service like the [ActivatedRoute](https://angular.io/api/router/ActivatedRoute) wich give access to your route params & your resoved data ...

## Other helpful methods

`SeoService` comes with varied setter methods, used in the `set` method to set individual `PageSeoData` property meta tags.
For exemple `setTitle(title: string)` will set title related meta tags wich are:

- title tag: `<title></title>`
- Meta tags: `meta[property='og:title']` - `meta[name='twitter:title']` & `meta[name='title']`

& also comes with a method `generateTags` to create/update meta tags for a given `MetaDefinition` array to generate non supported meta tags

---

<p align="center">Made with ❤️ by <a href="https://www.rabraghib.me">Rabyâ Raghib</a></p>
