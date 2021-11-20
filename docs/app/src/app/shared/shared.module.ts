import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { DocSectionPipe } from './doc-section.pipe';
import { CategoryCardComponent } from './category-card/category-card.component';

const EXPORTS = [FooterComponent, DocSectionPipe, CategoryCardComponent];

@NgModule({
  declarations: [...EXPORTS],
  imports: [CommonModule, MatCardModule, RouterModule],
  exports: [...EXPORTS]
})
export class SharedModule {}
