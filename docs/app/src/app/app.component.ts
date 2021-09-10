import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  template: `
    <div class="navbar"></div>
    <main>
      <ngaox-icon name="social:linkedin-in" style="width: 60px;"></ngaox-icon>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-rows: 60px 1fr;
      }
      .navbar {
        background: #4869ee;
      }
      .navbar,
      main {
        overflow: hidden;
      }
    `
  ]
})
export class AppComponent {}
