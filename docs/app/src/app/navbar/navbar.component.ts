import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'docs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  readonly SECTIONS = [
    {
      path: '/docs',
      name: 'Docs'
    },
    {
      path: '/docs/schematics',
      name: 'Schematics'
    },
    {
      path: '/guide',
      name: 'Guides'
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
