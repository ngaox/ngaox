import {
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional
} from '@angular/core';
import { IconComponent } from './icon.component';
import { IconsService } from './icons.service';
import { FALLBACK_ICON, IconByUrl, SvgIcon } from './models';

const GLOBAL_ICONS: InjectionToken<GlobalIcons> = new InjectionToken(
  'GLOBAL_ICONS'
);

interface GlobalIcons {
  icons: SvgIcon[];
  iconsByUrl: IconByUrl[];
}

/**
 * Integrate `@ngaox/icons` to your app in the root module (`AppModule`). as follows:
 * ```
 * @NgModule({
 *   imports: [HttpClientModule, IconsModule.forRoot(...params)]
 * })
 * class AppModule {}
 * ```
 *
 * and for other child modules you will need to import only `IconsModule`
 * ```
 * @NgModule({
 *   imports: [IconsModule]
 * })
 * class MyNgModule {}
 * ```
 */
@NgModule({
  declarations: [IconComponent],
  imports: [],
  exports: [IconComponent],
  providers: []
})
export class IconsModule {
  constructor(
    @Optional() @Inject(GLOBAL_ICONS) globalIcons: GlobalIcons,
    iconsService: IconsService
  ) {
    if (globalIcons.icons) {
      globalIcons.icons.forEach(icon => {
        iconsService.add(icon.name, icon.svg);
      });
    }
    if (globalIcons.icons) {
      globalIcons.iconsByUrl.forEach(iconByUrl => {
        iconsService.addByUrl(iconByUrl.url, iconByUrl.name);
      });
    }
  }

  /**
   * @param fallbackSvgIcon a string represent the svg element to fallback to when icon not exist
   * @param icons an array of `SvgIcon` objects that are icons to be registered globally
   * @param iconsByUrl an array of `IconByUrl` objects that are icons by url to be registered globally
   */
  static forRoot(
    fallbackSvgIcon: string = '',
    icons: SvgIcon[] = [],
    iconsByUrl: IconByUrl[] = []
  ): ModuleWithProviders<IconsModule> {
    return {
      ngModule: IconsModule,
      providers: [
        IconsService,
        {
          provide: FALLBACK_ICON,
          useValue: fallbackSvgIcon
        },
        {
          provide: GLOBAL_ICONS,
          useValue: {
            icons,
            iconsByUrl
          }
        }
      ]
    };
  }
}
