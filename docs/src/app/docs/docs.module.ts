import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './docs.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      {
        path: 'seo',
        children: []
      },
      {
        path: ':slug',
        children: []
      },
      {
        path: 'padup/:slug',
        children: []
      }
    ]
  }
];

@NgModule({
  declarations: [DocsComponent, SidebarComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DocsModule {}
