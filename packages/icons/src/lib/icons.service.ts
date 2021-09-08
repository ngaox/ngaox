import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FALLBACK_ICON } from './models';

@Injectable()
export class IconsService {
  private icons = new Map<string, SVGElement>();
  private lazyIcons = new Map<string, Observable<SVGElement>>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    @Optional() @Inject(FALLBACK_ICON) private fallbackIcon: string
  ) {}

  private textToSvgElement(svg: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = svg;
    const svgEl = div.querySelector('svg') as SVGElement;
    if (svgEl) {
      svgEl.removeAttribute('style');
      svgEl.removeAttribute('class');
      svgEl.setAttribute('fill', 'currentColor');
    }
    return svgEl;
  }

  /**
   * get an already registered/added icon
   *
   * @see  {@link IconsService.add} & {@link IconsService.addByUrl}
   */
  get(name: string): Observable<SVGElement | undefined> | undefined {
    if (this.icons.has(name)) {
      return of(this.icons.get(name));
    } else if (this.lazyIcons.has(name)) {
      return this.lazyIcons.get(name);
    }
    return throwError(`Svg with name '${name}' has not been added`);
  }

  getFallbackIcon() {
    return this.fallbackIcon;
  }

  /**
   * Add an SVG icon to the registry with an alias `name`
   *
   * pass to it a `name` for the icon and the `svg` element
   * you can pass also a boolean value `override` (default to false) whether or not replacing existing `svg` if `name` already exists
   *
   * @see {@link IconsService.addByUrl}
   */
  add(name: string, svg: string, override: boolean = false) {
    if (override || !this.icons.has(name)) {
      this.icons.set(name, this.textToSvgElement(svg));
    } else if (this.icons.has(name)) {
      throw new Error(
        'svg icon name already used!!\nset override argument to true if you want to replace its content.'
      );
    }
  }

  /**
   * Add an SVG icon to the registry via a `url` with an alias `name` (default to `url`)
   *
   * you can pass also a boolean value `override` (default to false) whether or not replacing existing `svg` if `name` already exists
   *
   * @see {@link IconsService.add}
   */
  async addByUrl(url: string, name: string = url, override: boolean = false) {
    await this.http
      .get(url, { responseType: 'text' })
      .pipe(tap(svg => this.add(name, svg, override)))
      .toPromise();
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
