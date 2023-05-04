import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { SetupSchema } from '../generator/schema/schema';

export const NGAOX_FEATURES = ['seo', 'icons'];
export const FEATURE_OPTIONS: FeatureOption[] = [
  {
    name: 'SVG Icon Optimization & Inlining',
    value: 'icons'
  },
  {
    name: 'Advanced SEO & Social-Media Management',
    value: 'seo'
  }
];

export interface FeatureOption {
  name: string;
  value: string;
}

export interface INgaoxRuleOptions {
  raw: SetupSchema;
  project: ProjectDefinition;
  NgaoxCurrentVersion: string;
  module: {
    name: string;
    path: string;
    dir: string;
  };
}
