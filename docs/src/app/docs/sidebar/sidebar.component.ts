import { Component } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { NavRoute, RoutesService } from '../routes.service';

@Component({
  selector: 'docs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  links$: Observable<NavRoute[]>;

  constructor(scully: ScullyRoutesService, routesHelper: RoutesService) {
    this.links$ = routesHelper.docsRoutesList(scully.available$);
  }
}
