import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ScullyLibModule } from '@scullyio/ng-lib';
import { DocsComponent } from './docs.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'seo',
    component: DocsComponent
  },
  {
    path: ':slug',
    component: DocsComponent
  },
  {
    path: 'padup/:slug',
    component: DocsComponent
  }
];

@NgModule({
  declarations: [DocsComponent, SidebarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ScullyLibModule]
})
export class DocsModule {}
