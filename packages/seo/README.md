# Ngaox Seo <!-- omit in toc -->

`@ngaox/seo` is an angular library to help generate & managing meta & other necessary tags that allow Social Media sharing & improve page SEO ranking.

# Table of contents <!-- omit in toc -->

- [Installation](#installation)
- [Getting started](#getting-started)
  - [Usage via SEO component](#usage-via-seo-component)
  - [Set global defaults](#set-global-defaults)
  - [SeoService](#seoservice)
  - [How to handle specialized cases](#how-to-handle-specialized-cases)
- [Angular Schematics](#angular-schematics)

# Installation

To install this library run:

```bash
npm install @ngaox/seo
```

or if you from the ngaox ecosystem 🤝:

```bash
ng g @ngaox/devkit:setup-seo
```

# Getting started

You can start using Ngaox Seo by importing `SeoModule` and configuring it for the root module. Optionally you can sets up [the global defaults for your app](#set-global-defaults).

```ts
// app.module.ts
import { SeoModule } from '@ngaox/seo';

@NgModule({
  /* ... */
  imports: [
    /* ... */
    SeoModule.forRoot()
  ]
})
export class AppModule {}
```

By default it will set the page SeoData to the deepest route's `NgaoxSeo` data property:

```ts
const routes: Routes = [
  {
    path: 'users',
    data: {
      // This 👇 will be used as the page seo data
      NgaoxSeo: {
        title: 'Users List Page',
        description: 'A short description goes here.',
        siteName: 'Ngaox'
      }
    },
    children: [
      {
        path: ':id',
        resolve: {
          // For dynamic pages resolvers is your friend 😉
          NgaoxSeo: UserSeoResolver
        }
      }
    ]
  }
];
```

Check out the docs for [all available options and their utility](https://ngaox-lab.web.app/docs/seo#available-seo-options).

## Usage via SEO component

Ngaox-Seo can also works by including it your page component and passing to it the `seoData` as inputs (attribute).

```html
<ngaox-seo
  title="Hello World"
  description="This is a description"
  keywords="keyword1, keyword2, keyword3"
  [twitter]="{
    site: '@NgaoxLab',
    creator: '@rabraghib'
  }"
></ngaox-seo>
```

## Set global defaults

You might want to set some default values for your app like `siteName` or `twitterCreator`...

thats can be done by passing your defaults values as the first argument to `SeoModule.forRoot` method (The defaults object should implement `IPageSeoData` interface).

```ts
// app.module.ts
import { SeoModule } from '@ngaox/seo';
// ...
@NgModule({
  /* ... */
  imports: [
    /* ... */
    SeoModule.forRoot({
      title: 'React is garbage 😈',
      keywords: '1, 2, 3',
      type: 'website',
      twitterCreator: '@twitter',
      siteName: 'Cool app 😎'
      // ...
    })
  ]
})
export class AppModule {}
```

## SeoService

The `SeoService` is the service you can use to set page meta tags & title.

The service is provided in the `root` module. So you need just to inject it wherever you need it.

and set page `SeoData` by calling `set` method & passing in your Data

```ts
import { SeoService, IPageSeoData } from '@ngaox/seo';

seoData: IPageSeoData = {
  title: 'What if you were an alien?'
  // check PageSeoData interface below
};
constructor(seo: IPageSeoData) {
  seo.set(this.seoData);
  // ...
}
```

## How to handle specialized cases

Checkout the docs for [How to create a custom SEO loader](https://ngaox-lab.web.app/docs/advanced/custom-seo-loader).

# Angular Schematics

Schematics for Ngaox Seo are available as part of [Ngaox Devkit](https://www.npmjs.com/package/@ngaox/devkit). Find out more in [the schematics docs](https://ngaox-lab.web.app/docs/schematics).

---

<p align="center">Made with ❤️ by <a href="https://www.rabraghib.me">Rabyâ Raghib</a></p>
