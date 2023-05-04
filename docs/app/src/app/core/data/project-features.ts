import { INgaoxFeature } from '@docs-core/models';

export default [
  {
    imgAlt: 'Ngaox Devkit',
    routerLink: '/docs/start',
    headline: 'Rich & friendly Devkit',
    image: '/assets/features/devkit.png',
    body: `Compile, optimize, and bundle your files and assets in build time using @ngaox/devkit's rich and friendly builders. Seamlessly integrate them with your Angular application with a high customization level and ease.`
  },
  {
    imgAlt: 'Ngaox SEO',
    routerLink: '/docs/seo',
    headline: 'SEO and Social Media!',
    image: '/assets/features/seo.png',
    body: 'Generate and manage all the necessary meta tags to ensure that your app allows Social Media sharing & your pages rank well on SEO!'
  },
  {
    imgAlt: 'Ngaox Icons',
    routerLink: '/docs/icons',
    headline: 'SVG icons inlining',
    image: '/assets/features/icons.png',
    body: 'Optimize and easily inline all kinds of SVG icons resulting in improved performance and DX, as well as reduced file sizes.'
  }
] as INgaoxFeature[];
