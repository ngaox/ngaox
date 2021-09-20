import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { HighlightService } from '../../../core/highlight.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'docs-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewerComponent implements AfterViewChecked, OnInit {
  content$?: Observable<string>;

  constructor(
    private highlightService: HighlightService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.content$ = this.route.data.pipe(map(data => data['content']));
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
