import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
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
        position: sticky;
        z-index: 9;
        top: 0;
        left: 0;
        width: 100%;
        mat-progress-bar {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    `
  ]
})
export class AppComponent {
  showProgressBar$: Observable<boolean> = this.router.events.pipe(
    filter(
      (e: RouterEvent) =>
        e instanceof NavigationStart ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError ||
        e instanceof NavigationEnd
    ),
    map(e => e instanceof NavigationStart)
  );

  constructor(private router: Router) {}
}
