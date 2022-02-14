import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'docs-feature-promo-card',
  templateUrl: './feature-promo-card.component.html',
  styleUrls: ['./feature-promo-card.component.scss']
})
export class FeaturePromoCardComponent {
  @Input() headline!: string;
  @Input() body!: string;
  @Input() image!: string;
  @Input() imgAlt!: string;
  @Input()
  @HostBinding('class.reverse')
  reverse = false;
}
