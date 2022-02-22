import { Component, HostBinding, Input, OnInit } from '@angular/core';
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
export class IconComponent implements OnInit {
  @Input() name?: string;
  @Input() url?: string;
  @HostBinding('innerHTML') svgEl?: SafeHtml;
  @HostBinding('style.width') @Input() width?: string;
  @HostBinding('style.height') @Input() height?: string;

  constructor(private icons: IconsService, private sanitizer: DomSanitizer) {}

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
        if (!svg?.outerHTML) throw new Error('incorrect svg content');
        this.svgEl = this.sanitizer.bypassSecurityTrustHtml(svg.outerHTML);
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
