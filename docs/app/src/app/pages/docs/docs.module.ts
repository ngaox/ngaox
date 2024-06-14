import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { DocsComponent } from './docs.component';
import { IconsModule } from '@ngaox/icons';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

import { DocsItemResolver } from '@docs-core/resolvers/docs-item.resolver';
import { ContentsMapResolver } from '@docs-core/resolvers/contents-map.resolver';

import { SidenavComponent } from './sidenav/sidenav.component';
import { ViewerComponent } from './viewer/viewer.component';
import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    resolve: {
      contentsMap: ContentsMapResolver
    },
    children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
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
    SidenavComponent,
    TableOfContentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IconsModule,
    SharedModule,
    ...MATERIAL_IMPORTS
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class DocsModule {}
