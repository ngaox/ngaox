import { Component, Input } from '@angular/core';
import { DocSection } from 'docs/models';
import { matExpansionAnimations } from '@angular/material/expansion';

@Component({
  selector: 'docs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [matExpansionAnimations.bodyExpansion]
})
export class SidenavComponent {
  @Input() DocSections!: DocSection[];

  constructor() {}
}
