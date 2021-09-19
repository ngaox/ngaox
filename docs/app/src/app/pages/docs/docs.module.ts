import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocsComponent } from './docs.component';
import { IconsModule } from '@ngaox/icons';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { ViewerComponent } from './viewer/viewer.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'categories' },
      { path: 'categories', component: CategoriesComponent },
      { path: ':slug', component: ViewerComponent }
    ]
  }
];

const MATERIAL_IMPORTS = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule
];

@NgModule({
  declarations: [DocsComponent, ViewerComponent, CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IconsModule,
    LayoutModule,
    ...MATERIAL_IMPORTS
  ]
})
export class DocsModule {}
