import { Component } from '@angular/core';
import {
  ResolveStart,
  Router,
  Event as RouterEvent,
  ResolveEnd,
  NavigationStart,
  NavigationEnd
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'docs-root',
  template: `
    <docs-navbar></docs-navbar>
    <div class="main-content">
      <div class="progress-bar-container">
        <mat-progress-bar
          mode="indeterminate"
          *ngIf="showProgressBar$ | async"
        ></mat-progress-bar>
      </div>
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
      .main-content {
        overflow: hidden auto;
        position: relative;
      }
      .progress-bar-container {
        position: absolute;
        z-index: 9;
        top: 0;
        left: 0;
        width: 100%;
      }
    `
  ]
})
export class AppComponent {
  showProgressBar$: Observable<boolean> = this.router.events.pipe(
    filter(
      (e: RouterEvent) =>
        e instanceof ResolveStart ||
        e instanceof ResolveEnd ||
        e instanceof NavigationStart ||
        e instanceof NavigationEnd
    ),
    map(e => {
      console.log('gg');
      return (
        e instanceof ResolveStart ||
        e instanceof NavigationStart ||
        !(e instanceof ResolveEnd || e instanceof NavigationEnd)
      );
    })
  );

  constructor(private router: Router) {}
}
