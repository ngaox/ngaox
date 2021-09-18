import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  template: `
    <docs-navbar></docs-navbar>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-rows: auto 1fr;
      }
      div {
        overflow: hidden auto;
      }
    `
  ]
})
export class AppComponent {}
