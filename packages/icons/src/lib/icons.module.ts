import {
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional
} from '@angular/core';
import { IconComponent } from './icon.component';
import { IconsService } from './icons.service';
import { INgaoxIcon, NGAOX_FALLBACK } from './models';

const NgaoxGlobalIcons: InjectionToken<INgaoxIcon[]> = new InjectionToken(
  'NgaoxGlobalIcons'
);

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
    @Optional() @Inject(NgaoxGlobalIcons) icons: INgaoxIcon[] = [],
    iconsService: IconsService
  ) {
    icons.forEach(icon => {
      iconsService.add(icon.name, icon.data, true);
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
    fallbackHtml: string = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/></svg>'
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
