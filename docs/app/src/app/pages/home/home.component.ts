import { Component } from '@angular/core';
import { TitleService } from '../../core/title.service';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('');
  }
}
