import { Component, Input } from '@angular/core';
import { matExpansionAnimations } from '@angular/material/expansion';
import { IDocsSection } from '@docs-core/models';

@Component({
  selector: 'docs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [matExpansionAnimations.bodyExpansion]
})
export class SidenavComponent {
  @Input() sections: IDocsSection[] = [];
}
