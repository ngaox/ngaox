import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider
} from '@angular/core';
import { IconsService } from './icons.service';
import { INgaoxIcon, NGAOX_FALLBACK, NgaoxGlobalIcons } from './models';

export const enum IconsFeatureType {
  FallbackIconFeature,
  GlobalIconsFeature
}

export interface NgaoxIconsFeature {
  type: IconsFeatureType;
  providers: Array<Provider | EnvironmentProviders>;
}

export function provideNgaoxIcons(...features: NgaoxIconsFeature[]) {
  return makeEnvironmentProviders([
    IconsService,
    features.map(f => f.providers)
  ]);
}

// Fallback Icon Feature
export function withFallbackIcon(fallbackIcon: string): NgaoxIconsFeature {
  return {
    type: IconsFeatureType.FallbackIconFeature,
    providers: [
      {
        provide: NGAOX_FALLBACK,
        useValue: fallbackIcon
      }
    ]
  };
}

// Global Icons Feature
export function withGlobalIcons(icons: INgaoxIcon[]): NgaoxIconsFeature {
  return {
    type: IconsFeatureType.GlobalIconsFeature,
    providers: [
      {
        provide: NgaoxGlobalIcons,
        useValue: icons,
        multi: true
      }
    ]
  };
}
