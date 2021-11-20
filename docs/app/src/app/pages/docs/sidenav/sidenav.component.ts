import { Component, Input } from '@angular/core';
import { DocContentItem, DocParentSection, DocSection } from 'docs/models';
import { matExpansionAnimations } from '@angular/material/expansion';
import { DataService } from '../../../core/data.service';

@Component({
  selector: 'docs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [matExpansionAnimations.bodyExpansion]
})
export class SidenavComponent {
  @Input() DocSections!: DocSection[];

  constructor(private dataService: DataService) {}
  isCurrentPageSection(item: DocParentSection): boolean {
    const currentSection = this.dataService.getCurrentDocSection();
    return (
      (currentSection &&
        'type' in currentSection &&
        (currentSection as DocContentItem).type === item.name) ??
      false
    );
  }
}
