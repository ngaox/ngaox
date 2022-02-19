import { Component } from '@angular/core';
import { PROJECT } from '@docs-core/data';
import { INgaoxFeature } from '@docs-core/models';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  headline = PROJECT.headline;
  description = PROJECT.description;
  features: INgaoxFeature[] = PROJECT.features;
}
