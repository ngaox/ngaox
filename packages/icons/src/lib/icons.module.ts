import {
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional
} from '@angular/core';
import { IconComponent } from './icon.component';
import { IconsService } from './icons.service';
import { NGAOX_FALLBACK } from './models';
import { INgaoxIcon } from '@ngaox/devkit/common/icons';

const NgaoxGlobalIcons: InjectionToken<INgaoxIcon[]> = new InjectionToken(
  'NgaoxGlobalIcons'
);

declare const _NGAOX_BUILT_ICONS: INgaoxIcon[];

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
 *
 * If your using @ngaox/devkit builder all your icons will be auto registered.
 */
@NgModule({
  declarations: [IconComponent],
  imports: [],
  exports: [IconComponent],
  providers: []
})
export class IconsModule {
  constructor(
    @Optional() @Inject(NgaoxGlobalIcons) icons: INgaoxIcon[] = [],
    iconsService: IconsService
  ) {
    if (typeof _NGAOX_BUILT_ICONS !== 'undefined') {
      _NGAOX_BUILT_ICONS.forEach(icon => {
        iconsService.add(icon.name, icon.data);
      });
    }

    icons.forEach(icon => {
      iconsService.add(icon.name, icon.data);
    });
  }

  /**
   * Creates and configures a module with module level Icons and optionally change the default fallbackHtml icon.
   *
   * For none root module use only add `IconsModule` to your imports
   * For the root NgModule, import as follows:
   *
   * ```
   * @NgModule({
   *   imports: [IconsModule.forRoot(APP_ICONS)]
   * })
   * class MyNgModule {}
   * ```
   *
   * @param icons an arrays of icons to register
   * @param fallbackHtml a string represent the svg element to fallback to when icon not found (default to an exclamation mark svg)
   */
  static forRoot(
    icons: INgaoxIcon[] = [],
    fallbackHtml: string = `
      <svg viewBox="0 0 612 612" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M306 50C164.6 50 50 164.6 50 306C50 447.4 164.6 562 306 562C447.4 562 562 447.4 562 306C562 164.6 447.4 50 306 50ZM282 202C282 188.8 292.8 178 306 178C319.2 178 330 188.75 330 202V330C330 343.25 319.25 354 306 354C292.75 354 282 343.3 282 330V202ZM306 450C288.64 450 274.56 435.92 274.56 418.56C274.56 401.2 288.63 387.12 306 387.12C323.37 387.12 337.44 401.2 337.44 418.56C337.4 435.9 323.4 450 306 450Z"/>
      </svg>
    `
  ): ModuleWithProviders<IconsModule> {
    return {
      ngModule: IconsModule,
      providers: [
        IconsService,
        {
          provide: NGAOX_FALLBACK,
          useValue: fallbackHtml
        },
        {
          provide: NgaoxGlobalIcons,
          useValue: icons
        }
      ]
    };
  }
}
