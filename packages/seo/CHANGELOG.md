# Changelog

## [1.5.0](https://www.github.com/rabraghib/ngaox/compare/seo-v1.4.1...seo-v1.5.0) (2021-09-11)


### Features

* **seo:** provide a helper function to get activated route ([3bdc5ae](https://www.github.com/rabraghib/ngaox/commit/3bdc5ae7d539f3a7540846104613e74f10221c2f))

### [1.4.1](https://www.github.com/rabraghib/ngaox/compare/seo-v1.4.0...seo-v1.4.1) (2021-07-12)

### Bug Fixes

- **seo:** :bug: `SeoService` NG0201 error when SeoModule is not imported ([d9c3be3](https://www.github.com/rabraghib/ngaox/commit/d9c3be391f087376ed19f738d9770e1b901b5c85))

## 1.4.0 (2021-05-14)

### Features

- Provide `SeoService` for setting document meta tags & title...
- Add `SeoModule` to set `SeoService` page seoData default values
- Support Loaders as a way to set seoData dynamicly
- Provide `presetsLoader` to help managing Loaders & pages seo data
- Add semantics to help setup a module to manage pages seo data

  ```sh
  ng g @ngaox/seo:setup
  ```
