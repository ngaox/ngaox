# NgaoxSeo

`@ngaox/seo` is an angular library to help generate & managing meta & other necessary tags that allow Social Media sharing & improve page seo display info & ranking

**Important:** Generally you should use this library only if you are rendering you pages before page laod which can be done on the angular world using [Universal](https://angular.io/guide/universal) or [Scully](https://scully.io/) or any other way you prefer.

---

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Getting started](#getting-started)
    - [Set global defaults](#set-global-defaults)
    - [Other methods](#other-seoservice-methods)
  - [License](#license)
  - [How can I support the project?](#how-can-i-support-the-project)

---

## Installation
To install this library run:

```bash
# with Angular Cli
ng add @ngaox/seo
```
```bash
# with npm
npm install @ngaox/ceo
```
```bash
# with yarn
yarn add @ngaox/seo
```

---

## Usage
### Getting started
The `SeoService` is the service used to set page meta tags & title for allowing social-media apps to preview your pages & provide additional information about these pages for SEO purposes. 
The service is provided in the `root` module. So you need just to inject it wherever you need it.
```ts
import { SeoService } from '@ngaox/seo';
// ...
    constructor(seo: SeoService) { /* ... */ }
//...
```
After you can set seo data by calling `set` method & passing your Data
```ts
let seoData: PageSeoData = {
    // your data ...
}
seo.set(seoData)
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
    imageData?: imageData; // imageData interface below 
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
```
### Set global defaults
However you might want to set some default values for your app like `siteName`  or `twitterCreator` ...

thats can be done by importing `SeoModule` and calling `forRoot` method with your defaults values wich are also of type `PageSeoData`
```ts
// ...
import { SeoModule } from '@ngaox/seo';
// ...
@NgModule({
    /* ... */
    imports: [
        /* ... */
        SeoModule.forRoot({
            title: "the space is so close 😕",
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
### Other `SeoService` methods
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