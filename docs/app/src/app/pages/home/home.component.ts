import { Component } from '@angular/core';
import { PROJECT } from '@docs-core/data';
import { INgaoxFeature } from '@docs-core/models';
import { TitleService } from '@docs-core/title.service';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  headline = PROJECT.headline;
  description = PROJECT.description;
  features: INgaoxFeature[] = PROJECT.features;
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('');
  }
}
