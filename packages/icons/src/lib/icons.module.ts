import { InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { IconsService } from './icons.service';
import { INgaoxIcon, NGAOX_FALLBACK } from './models';

export const NgaoxGlobalIcons: InjectionToken<INgaoxIcon[]> =
  new InjectionToken('NgaoxGlobalIcons');

export function provideNgaoxIcons(
  icons: INgaoxIcon[] = [],
  fallbackIcon: string | undefined = undefined
) {
  return makeEnvironmentProviders([
    IconsService,
    {
      provide: NgaoxGlobalIcons,
      useValue: icons
    },
    {
      provide: NGAOX_FALLBACK,
      useValue: fallbackIcon
    }
  ]);
}
