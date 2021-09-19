import { Component } from '@angular/core';

@Component({
  selector: 'docs-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {
  content: string = '';

  constructor() {}
}
