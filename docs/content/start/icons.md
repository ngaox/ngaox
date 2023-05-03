---
name: SVG Icons Inlining
---

Ngaox solution for icons is using inlining SVGs. either from source files (Recommended)
or from CDN using their raw URLs or by bundling them with your application.

Ngaox Icons (`@ngaox/icons`) provides a registry (`IconsService`) that loads, caches and adds SVG icons by a unique name,
with a component (`<ngaox-icon>`) for displaying (Inlining) them by their unique name.

## Installation & Setup

```bash
ng generate @ngaox/devkit:setup --features=icons
```

## Getting Started

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
- `fallbackHtml` a string represent the content (usually SVG string) to fallback to when the icon not exist

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
<ngaox-icon
  name="my-icon-name"
  url="assets/my-icon.svg"
  width="100px"
></ngaox-icon>
```

_By default, the icon has no width set so It may not appear if you didn't set it!_

Or if the icon was previously registered with a name you can use it like:

```html
<ngaox-icon name="my-icon" width="100px"></ngaox-icon>
```

## Icons Registry

All icons [specified in the module import](#manual-setup) are registered and ready to use.

However you can use `IconsService` to add, remove and get icons from the registry, all you need to do is just to inject it wherever you need to:

```ts
import { IconsService } from '@ngaox/icons';

constructor(icons: IconsService) {
  icons.add('my-icon-name', {
    url: 'assets/my-icon.svg',
    lazy: true
  });
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

## Registering SVG icons with @ngaox/devkit Builders

If you are using `@ngaox/devkit` [builders](https://ngaox-lab.web.app/docs/press#builders) and you want to automagically register all the SVG files in a specific folder,
you can do so by configuring an entry in the `content` option in the `ngaox.config.js` file with `IconsBuilder` and `rawParser`.

Here is an example where we register all the SVG files in the `src/icons` folder:

```javascript
const { IconsBuilder, rawParser } = require('@ngaox/devkit');

/**
 * @type {import('@ngaox/devkit').IBuilderOptions}
 */
module.exports = {
  content: {
    myIconsEntry: {
      dir: 'src/icons',
      glob: '**/*.svg',
      parser: rawParser,
      builder: new IconsBuilder(),
      extra: {
        namespace: 'app', // prefix all icon names with `app:`
        svgoConfig: {
          // svgo configuration options
          // See: https://github.com/svg/svgo#configuration
        }
      }
    }
    // ...
  }
};
```

You can also use a short form for the configuration above when using `icons` as your entry name:

```javascript
module.exports = {
  content: {
    icons: 'src/icons'
    // ...
  }
};
```

With this configuration, all the SVG files in the `src/icons` folder will be added to the registry automatically with a normalized version of their filename prefixed with `app:` (as we specified in the `extra.namespace` option) as the icon name.

For example.

```folders
└── src
│   │   my-icon.svg
│   │
│   └── sub-folder
│       │   icon-in-subfolder.svg
│       │
│   ...

```

It can be access from the registry with names:

```html
<ngaox-icon name="app:my-icon"></ngaox-icon>
<ngaox-icon name="app:sub-folder:icon-in-subfolder"></ngaox-icon>
```
