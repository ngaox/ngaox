import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { NGAOX_FALLBACK, ILazyIcon } from './models';

@Injectable()
export class IconsService {
  private icons = new Map<string, SVGElement>();
  private lazyIcons = new Map<string, Observable<SVGElement>>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    @Optional() @Inject(NGAOX_FALLBACK) private fallbackIcon: string
  ) {}

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
   * @see  {@link IconsService.add} & {@link IconsService.addByUrl}
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
   * @see {@link IconsService.addByUrl}
   */
  add(
    name: string,
    value: string | ILazyIcon,
    override: boolean = true
  ): Observable<SVGElement | undefined> {
    if (typeof value === 'string') {
      if (override || !this.icons.has(name)) {
        this.icons.set(name, this.textToSvgElement(value));
      }
    } else {
      if (override || !this.lazyIcons.has(name)) {
        this.lazyIcons.set(
          name,
          this.http
            .get(value.url, { responseType: 'text' })
            .pipe(map(svg => this.textToSvgElement(svg)))
        );
      }
    }
    return this.get(name);
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
