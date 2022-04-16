import { Component } from '@angular/core';
import { INgaoxFeature } from '@docs-core/models';
import PROJECT from '@docs-core/data/about-ngaox';
import FEATURES from '@docs-core/data/project-features';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  headline = PROJECT.headline;
  description = PROJECT.description;
  features: INgaoxFeature[] = FEATURES;
}
