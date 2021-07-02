import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PadupComponent } from './padup.component';

const routes: Routes = [{ path: '', component: PadupComponent }];

@NgModule({
  declarations: [PadupComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PadupModule {}
