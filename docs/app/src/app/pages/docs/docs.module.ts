import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { DocsComponent } from './docs.component';
import { IconsModule } from '@ngaox/icons';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

import { DocsItemResolver } from '@docs-core/resolvers/docs-item.resolver';
import { ContentsMapResolver } from '@docs-core/resolvers/contents-map.resolver';

import { SidenavComponent } from './sidenav/sidenav.component';
import { CategoriesComponent } from './categories/categories.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    resolve: {
      contentsMap: ContentsMapResolver
    },
    children: [
      { path: '', component: CategoriesComponent },
      {
        matcher: url => {
          return {
            consumed: url,
            posParams: {
              slug: new UrlSegment(url.map(i => i.path).join('/'), {})
            }
          };
        },
        component: ViewerComponent,
        resolve: {
          docsItem: DocsItemResolver
        }
      }
    ]
  }
];

const MATERIAL_IMPORTS = [MatToolbarModule, MatButtonModule, MatSidenavModule];

@NgModule({
  declarations: [
    DocsComponent,
    ViewerComponent,
    CategoriesComponent,
    SidenavComponent
  ],
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
