import { Component, HostBinding, effect, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IconsService } from './icons.service';

@Component({
  selector: 'ngaox-icon',
  template: ` <span>hello</span> `,
  standalone: true,
  styles: `
    :host {
      display: inline-block;
      vertical-align: middle;
    }
  `
})
export class NgaoxIconComponent {
  readonly name = input.required<string>();
  readonly url = input<string>();
  readonly width = input<string>();
  readonly height = input<string>();

  readonly svgContent = signal<SafeHtml>(
    this.sanitizer.bypassSecurityTrustHtml(this.service.getFallbackIcon())
  );

  @HostBinding('style.width') get _width() {
    return this.width();
  }
  @HostBinding('style.height') get _height() {
    return this.height();
  }

  @HostBinding('innerHTML') get _svgContent() {
    return this.svgContent();
  }

  constructor(private service: IconsService, private sanitizer: DomSanitizer) {
    effect(() => {
      const name = this.name();
      const url = this.url();
      let icon: Observable<SVGElement | undefined>;
      if (url) {
        icon = this.service.add(name, {
          url,
          lazy: true
        });
      } else {
        icon = this.service.get(name);
      }
      icon.pipe(takeUntilDestroyed()).subscribe({
        next: svg => {
          const outerHTML = svg?.outerHTML;
          if (!outerHTML) {
            throw new Error(
              `Icon '${name}' not found or has incorrect content.`
            );
          }
          this.svgContent.set(
            this.sanitizer.bypassSecurityTrustHtml(outerHTML)
          );
        },
        error: () => {
          this.svgContent.set(
            this.sanitizer.bypassSecurityTrustHtml(
              this.service.getFallbackIcon()
            )
          );
          throw new Error(`Icon '${name}' not found or has incorrect content.`);
        }
      });
    });
  }
}
