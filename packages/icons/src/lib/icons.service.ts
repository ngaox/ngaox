import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of, map, shareReplay } from 'rxjs';
import { ILazyIcon, INgaoxIcon, NGAOX_FALLBACK } from './models';
import { NgaoxGlobalIcons } from './icons.module';

const defaultFallbackIcon = `
  <svg viewBox="0 0 612 612" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M306 50C164.6 50 50 164.6 50 306C50 447.4 164.6 562 306 562C447.4 562 562 447.4 562 306C562 164.6 447.4 50 306 50ZM282 202C282 188.8 292.8 178 306 178C319.2 178 330 188.75 330 202V330C330 343.25 319.25 354 306 354C292.75 354 282 343.3 282 330V202ZM306 450C288.64 450 274.56 435.92 274.56 418.56C274.56 401.2 288.63 387.12 306 387.12C323.37 387.12 337.44 401.2 337.44 418.56C337.4 435.9 323.4 450 306 450Z"/>
  </svg>
`;

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  private icons = new Map<string, SVGElement>();
  private lazyIcons = new Map<string, Observable<SVGElement>>();

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Optional()
    @Inject(NGAOX_FALLBACK)
    private fallbackIcon: string = defaultFallbackIcon,
    @Optional() @Inject(NgaoxGlobalIcons) icons?: INgaoxIcon[]
  ) {
    icons ??= [];
    this.addAll(icons);
  }

  private textToSvgElement(svg: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = svg;
    const svgEl = div.querySelector('svg') as SVGElement;
    if (svgEl) {
      svgEl.setAttribute('height', '100%');
      svgEl.setAttribute('width', '100%');
    }
    return svgEl;
  }

  /**
   * Get the fallback icon specified in the import of the `IconsModule.forRoot`
   * Used in the `ngaox-icon` component when the icon is not found
   * @see {@link https://ngaox-lab.web.app/docs/icons#fallback-icon}
   */
  getFallbackIcon() {
    return this.fallbackIcon;
  }

  /**
   * get an already registered/added icon
   *
   * @see  {@link IconsService.add}
   */
  get(name: string): Observable<SVGElement | undefined> {
    if (this.icons.has(name)) {
      return of(this.icons.get(name));
    } else if (this.lazyIcons.has(name)) {
      return this.lazyIcons.get(name) ?? of(undefined);
    }
    return of(undefined);
  }

  /**
   * Add an SVG icon to the NgaoxIcons registry
   *
   * @param name the name of the Icon in the registry (used in `ngaox-icon` component and {@link IconsService.get})
   * @param value the SVG content or {@link ILazyIcon} for lazy loaded icons
   * @param override (default to true) whether or not replacing existing `svg` if `name` already exists
   *
   */
  add(
    name: string,
    value: string | ILazyIcon
  ): Observable<SVGElement | undefined> {
    if (typeof value === 'string') {
      this.icons.set(name, this.textToSvgElement(value));
    } else {
      this.lazyIcons.set(
        name,
        this.http.get(value.url, { responseType: 'text' }).pipe(
          map(svg => this.textToSvgElement(svg)),
          shareReplay(1)
        )
      );
    }
    return this.get(name);
  }

  addAll(icons: INgaoxIcon[]) {
    icons.forEach(icon => {
      this.add(icon.name, icon.data);
    });
  }

  /**
   * remove a registered icon
   */
  remove(name: string) {
    if (this.icons.has(name)) {
      this.icons.delete(name);
    }
    if (this.lazyIcons.has(name)) {
      this.lazyIcons.delete(name);
    }
  }
}
