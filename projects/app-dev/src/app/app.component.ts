import { Component } from '@angular/core';
import { SeoService } from '@ngaox/seo';
import { ApiService } from '@ngaox/chaospad';

@Component({
  selector: 'dev-root',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class AppComponent {
  constructor(seoService: SeoService, api: ApiService) {
    seoService.setTitle('dfdf');
  }
}
