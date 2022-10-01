# Ngaox Seo

[![Ngaox for Angular](https://img.shields.io/badge/Angular-Ngaox-red.svg)](https://ngaox-lab.web.app)
[![npm Version](https://img.shields.io/npm/v/@ngaox/seo)](https://ngaox-lab.web.app/docs/seo)
[![Monthly Downloads](https://img.shields.io/npm/dm/@ngaox/seo)](https://www.npmjs.com/package/@ngaox/seo)

**Easily generate and manage SEO-friendly meta tags, page title,...**

## [Getting Started with Ngaox Seo](https://ngaox-lab.web.app/docs/seo)

## Samples

```ts
// Angular router routes
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
    }
  }
];
```

---

```html
<!-- Also available as an angular component -->
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
