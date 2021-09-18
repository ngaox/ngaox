import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocsComponent } from './docs.component';
import { IconsModule } from 'packages/icons/src/public-api';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: DocsComponent }];

const MATERIAL_IMPORTS = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule
];

@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IconsModule,
    LayoutModule,
    ...MATERIAL_IMPORTS
  ]
})
export class DocsModule {}
