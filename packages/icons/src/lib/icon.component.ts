import { Component, DestroyRef, computed, inject, input } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, map, Observable, of } from 'rxjs';
import { IconsService } from './icons.service';

@Component({
  selector: 'ngaox-icon',
  template: ``,
  standalone: true,
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[innerHTML]': 'svgContent()'
  },
  styles: `
    :host {
      display: inline-block;
      vertical-align: middle;
    }
  `
})
export class NgaoxIconComponent {
  private service = inject(IconsService);
  private sanitizer = inject(DomSanitizer);

  readonly name = input.required<string>();
  readonly url = input<string>();
  readonly width = input<string>();
  readonly height = input<string>();
  private readonly destroyRef = inject(DestroyRef);

  readonly svgContent = computed(() => {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.svgContentResource.value()
    );
  });

  readonly svgContentResource = rxResource({
    defaultValue: this.service.getFallbackIcon(),
    params: () => ({ name: this.name(), url: this.url() }),
    stream: ({ params }) => {
      let icon: Observable<SVGElement | undefined>;
      if (params.url) {
        icon = this.service.add(params.name, {
          url: params.url,
          lazy: true
        });
      } else {
        icon = this.service.get(params.name);
      }
      return icon.pipe(takeUntilDestroyed(this.destroyRef)).pipe(
        map(svg => {
          const outerHTML = typeof svg === 'string' ? svg : svg?.outerHTML;
          if (!outerHTML) {
            throw new Error(
              `Icon '${params.name}' not found or has incorrect content.`
            );
          }
          return outerHTML;
        }),
        catchError(err => {
          console.error(err);
          return of(this.service.getFallbackIcon());
        })
      );
    }
  });
}
