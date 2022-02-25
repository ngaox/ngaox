import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IconsService } from './icons.service';

@Component({
  selector: 'ngaox-icon',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: inline-block;
        vertical-align: middle;
      }
    `
  ]
})
export class IconComponent implements OnInit, OnChanges {
  @Input() name?: string;
  @Input() url?: string;
  @HostBinding('innerHTML') svgEl?: SafeHtml;
  @HostBinding('style.width') @Input() width?: string;
  @HostBinding('style.height') @Input() height?: string;

  constructor(private icons: IconsService, private sanitizer: DomSanitizer) {}

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
    icon.subscribe({
      next: svg => {
        let outerHTML = svg?.outerHTML;
        if (!outerHTML) {
          console.error('incorrect svg content');
          outerHTML = this.icons.getFallbackIcon();
        }
        this.svgEl = this.sanitizer.bypassSecurityTrustHtml(outerHTML);
      },
      error: err => {
        this.svgEl = this.sanitizer.bypassSecurityTrustHtml(
          this.icons.getFallbackIcon()
        );
        console.error(err);
      }
    });
  }
}
