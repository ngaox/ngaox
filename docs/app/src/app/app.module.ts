import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { builtIconAdapter, IconsModule } from '@ngaox/icons';
import { SeoModule } from '@ngaox/seo';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';

import { HomeComponent } from './pages/home/home.component';
import { SupportComponent } from './pages/home/support/support.component';
import { FeatureCardComponent } from './pages/home/feature-card/feature-card.component';

const icons = builtIconAdapter();

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  { path: 'start', redirectTo: 'docs/start' },
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
  MatDividerModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SupportComponent,
    FeatureCardComponent
  ],
  imports: [
    LayoutModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsModule.forRoot(icons),
    RouterModule.forRoot(routes),
    SeoModule.forRoot({
      title: 'Angular Ngaox',
      description: 'Angular development is easier than ever!'
    }),
    ...MATERIAL_IMPORTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
