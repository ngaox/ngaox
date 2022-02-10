import { INgaoxFeature } from '../models';

// TODO: Replace with real data
export const PROJECT = {
  name: 'Angular Ngaox',
  headline: 'Angular development is easier than ever!',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, rem dolor laborum aliquid voluptatibus molestias, inventore perferendis quam ipsam, tempora autem expedita cum. Explicabo neque laboriosam, adipisci aliquam dicta nobis.',
  features: getProjectFeatures()
};

function getProjectFeatures(): INgaoxFeature[] {
  return [
    {
      headline: 'Rich & friendly Devkit',
      body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, rem dolor laborum aliquid voluptatibus molestias, inventore perferendis quam ipsam, tempora autem expedita cum.',
      image:
        'https://angular.io/generated/images/marketing/home/responsive-framework.svg',
      imgAlt: 'Ngaox Devkit',
      routerLink: '/docs'
    },
    {
      headline: 'Inline SVGs',
      body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, rem dolor laborum aliquid voluptatibus molestias, inventore perferendis quam ipsam, tempora autem expedita cum.',
      image:
        'https://angular.io/generated/images/marketing/home/responsive-framework.svg',
      imgAlt: 'Inline SVG icons',
      routerLink: '/docs'
    },
    {
      headline: 'SEO helper',
      body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, rem dolor laborum aliquid voluptatibus molestias, inventore perferendis quam ipsam, tempora autem expedita cum.',
      image:
        'https://angular.io/generated/images/marketing/home/responsive-framework.svg',
      imgAlt: 'SEO helper',
      routerLink: '/docs'
    }
  ];
}
