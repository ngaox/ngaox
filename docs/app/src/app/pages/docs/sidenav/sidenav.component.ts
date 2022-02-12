import { Component, Input } from '@angular/core';
import { IDocsSection } from '@docs-core/models';

@Component({
  selector: 'docs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: []
})
export class SidenavComponent {
  @Input() sections: IDocsSection[] = [];
}
