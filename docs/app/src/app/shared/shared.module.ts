import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { SupportComponent } from './support/support.component';
import { FeaturePromoCardComponent } from './feature-promo-card/feature-promo-card.component';
import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';
import { MatListModule } from '@angular/material/list';

const EXPORTS = [
  FooterComponent,
  CategoryCardComponent,
  SupportComponent,
  FeaturePromoCardComponent,
  TableOfContentsComponent
];

@NgModule({
  declarations: [...EXPORTS],
  imports: [CommonModule, MatCardModule, RouterModule, MatListModule],
  exports: [...EXPORTS]
})
export class SharedModule {}
