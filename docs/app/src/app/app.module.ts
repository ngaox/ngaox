import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ICONS, IconsModule } from '@ngaox/icons';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('./pages/docs/docs.module').then(m => m.DocsModule)
  }
];

const MATERIAL_IMPORTS = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule
];

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    IconsModule.forRoot('', ICONS.Social),
    BrowserAnimationsModule,
    LayoutModule,
    ...MATERIAL_IMPORTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
