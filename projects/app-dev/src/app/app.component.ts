import { Component } from '@angular/core';
import { SeoService } from '@ngaox/seo';
import { ApiService, AuthService } from '@ngaox/chaospad';

@Component({
  selector: 'dev-root',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class AppComponent {
  constructor(seoService: SeoService, api: ApiService, auth: AuthService) {
    seoService.setTitle('dfdf');
    api.getCollection('/users').subscribe(data => {
      console.log(data);
    });
    auth
      .login({
        username: 'demouser',
        password: 'demo123'
      })
      .subscribe(data => {
        console.log(data);
      });
  }
}
