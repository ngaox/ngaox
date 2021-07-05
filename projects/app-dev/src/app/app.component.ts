import { Component } from '@angular/core';
import { SeoService } from '@ngaox/seo';

@Component({
  selector: 'dev-root',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class AppComponent {
  constructor(seoService: SeoService) {
    seoService.setTitle('dfdf');
  }
}
