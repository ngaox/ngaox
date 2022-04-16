import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, Observable, Subscription, throwError } from 'rxjs';
import { IconsService } from './icons.service';

@Component({
  selector: 'ngaox-icon',
  template: ``,
  styles: [
    `
      :host {
        display: inline-block;
        vertical-align: middle;
      }
    `
  ]
})
export class IconComponent implements OnInit, OnChanges, OnDestroy {
  @Input() name?: string;
  @Input() url?: string;
  @HostBinding('innerHTML') svgEl?: SafeHtml;
  @HostBinding('style.width') @Input() width?: string;
  @HostBinding('style.height') @Input() height?: string;
  private _iconSubscription?: Subscription;

  constructor(private icons: IconsService, private sanitizer: DomSanitizer) {}

  ngOnDestroy(): void {
    this._iconSubscription?.unsubscribe();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit() {
    let icon: Observable<SVGElement | undefined>;
    if (this.name === undefined) {
      throw new Error("Attribute 'name' is required");
    }
    if (this.url) {
      icon = this.icons.add(this.name, {
        url: this.url,
        lazy: true
      });
    } else {
      icon = this.icons.get(this.name);
    }

    this._iconSubscription = icon
      .pipe(
        map(svg => {
          const outerHTML = svg?.outerHTML;
          if (!outerHTML) {
            throw throwError(() => null);
          }
          this.svgEl = this.sanitizer.bypassSecurityTrustHtml(outerHTML);
        })
      )
      .subscribe({
        error: () => {
          this.svgEl = this.sanitizer.bypassSecurityTrustHtml(
            this.icons.getFallbackIcon()
          );
          throw new Error(
            `Icon '${this.name}' not found or has incorrect content.`
          );
        }
      });
  }
}
