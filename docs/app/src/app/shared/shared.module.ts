import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { SupportComponent } from './support/support.component';
import { FeaturePromoCardComponent } from './feature-promo-card/feature-promo-card.component';

const EXPORTS = [
  FooterComponent,
  CategoryCardComponent,
  SupportComponent,
  FeaturePromoCardComponent
];

@NgModule({
  declarations: [...EXPORTS],
  imports: [CommonModule, MatCardModule, RouterModule],
  exports: [...EXPORTS]
})
export class SharedModule {}
