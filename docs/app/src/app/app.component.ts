import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  template: `
    <docs-navbar></docs-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-rows: auto 1fr;
      }
    `
  ]
})
export class AppComponent {}
