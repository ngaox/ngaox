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
import { MatCardModule } from '@angular/material/card';

import { ViewerComponent } from './viewer/viewer.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentResolver } from './content.resolver';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'categories' },
      { path: 'categories', component: CategoriesComponent },
      {
        path: ':slug',
        component: ViewerComponent,
        resolve: {
          content: ContentResolver
        }
      }
    ]
  }
];

const MATERIAL_IMPORTS = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule
];

@NgModule({
  declarations: [DocsComponent, ViewerComponent, CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    IconsModule,
    LayoutModule,
    SharedModule,
    ...MATERIAL_IMPORTS
  ]
})
export class DocsModule {}
