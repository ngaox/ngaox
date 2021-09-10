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
  @Input() name?: string;
  @Input() svgUrl?: string;

  constructor(private icons: IconsService, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    if (this.svgUrl) {
      await this.icons.addByUrl(this.svgUrl, this.name, true);
      this.name = this.name ?? this.svgUrl;
    }
    if (this.name) {
      this.icons.get(this.name)?.subscribe({
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
