import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { RouterModule } from '@angular/router';

import { IconsModule } from '@ngaox/icons';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, MatCardModule, RouterModule, IconsModule],
  exports: [FooterComponent]
})
export class SharedModule {}
