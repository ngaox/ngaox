import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocsComponent } from './docs.component';

const routes: Routes = [{ path: '', component: DocsComponent }];

@NgModule({
  declarations: [DocsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DocsModule {}
