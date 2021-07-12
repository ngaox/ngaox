import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChaospadModule } from '@ngaox/chaospad';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, //
    AppRoutingModule,
    ChaospadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
