import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'docs-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {
  @Input() headline!: string;
  @Input() body!: string;
  @Input() image!: string;
  @Input() imgAlt!: string;
  @Input()
  @HostBinding('class.reverse')
  reverse = false;
}
