# Ngaox Icons <!-- omit in toc -->

Easily inline SVG icons into your angular app with a ready to import and use set of icons.

The library provides a registry (`IconsService`) that loads, caches and adds SVG by a unique name,
It also provides a component (`<ngaox-icon>`) for displaying (Inlining) a registered SVG using its name.

# Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [How to use?](#how-to-use)
  - [Setup in your app](#setup-in-your-app)
  - [Component Usage](#component-usage)
  - [Register icons](#register-icons)

# Installation

To install this library run:

```bash
ng add @ngaox/icons
```

# How to use?

## Setup in your app

Integrate `@ngaox/icons` with your app, just by import both the `HttpClientModule` & `IconsModule` in the root module (`AppModule`).
as follows:

```ts
@NgModule({
  imports: [HttpClientModule, IconsModule.forRoot()]
})
class AppModule {}
```

you can pass `IconsModule.forRoot` three params:

- `icons` an array of icons to be registered globally with a unique name
- `fallbackHtml` a string represent the SVG element to fallback to when the icon not exist

And for other child modules that need access to `<ngaox-icon>` you only will need to import `IconsModule`.

```ts
@NgModule({
  imports: [IconsModule]
})
class MyNgModule {}
```

## Component Usage

To inject an public (accessible via browser) SVG file to a component template:

```html
<svg-icon name="my-icon-name" url="assets/my-icon.svg" width="100px"></svg-icon>
```

_By default, the icon has no width set so It may not appear!_

Or if the icon was previously registered with a name you can use it like:

```html
<svg-icon name="my-icon" width="100px"></svg-icon>
```

## Register icons

All icons [specified in the module import](#setup-in-your-app) are registered and ready to use.

However you can use `IconsService` to add, remove and get icons from the registry, all you need to do is just to inject it wherever you need to:

```ts
import { IconsService } from '@ngaox/icons';

constructor(icons: IconsService) {
  icons.add('my-icon-name', {
    url: 'assets/my-icon.svg',
    lazy: true
  }, 'my-icon');
  icons.remove('ugly-icon');
  icons.add(
    'linkedIn-icon',
    `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path d=\"M8.421,14h0.052l0,0C11.263,14,13,12,13,9.5C12.948,6.945,11.263,5,8.526,5S4,6.945,4,9.5C4,12,5.736,14,8.421,14z M4,17h9v26H4V17z M44,26.5c0-5.247-4.253-9.5-9.5-9.5c-3.053,0-5.762,1.446-7.5,3.684V17h-9v26h9V28l0,0c0-2.209,1.791-4,4-4s4,1.791,4,4v15h9C44,43,44,27.955,44,26.5z\"/></svg>`
  );
  icons.get('linkedIn-icon')?.subscribe(svg => {
    console.log(svg);
  });
}
```

---

<p align="center">Made with ❤️ by <a href="https://www.rabraghib.me">Rabyâ Raghib</a></p>
