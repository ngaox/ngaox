import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconsService } from './icons.service';

@Component({
  selector: 'ngaox-icon',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: inline-block;
        width: 1.25rem;
      }
    `
  ]
})
export class IconComponent implements OnInit {
  @HostBinding('innerHTML') svgEl?: SafeHtml;
  @Input() svgIcon?: string;
  @Input() svgUrl?: string;

  constructor(private icons: IconsService, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    if (this.svgUrl) {
      await this.icons.addByUrl(this.svgUrl, this.svgIcon, true);
      this.svgIcon = this.svgIcon ?? this.svgUrl;
    }
    if (this.svgIcon) {
      this.icons.get(this.svgIcon)?.subscribe({
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
}
