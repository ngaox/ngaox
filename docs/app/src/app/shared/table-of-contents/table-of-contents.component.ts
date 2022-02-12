import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ITocLink } from '@docs-core/models';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'docs-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss']
})
export class TableOfContentsComponent implements OnInit, OnDestroy {
  @Input() toc: ITocLink[] = [];
  @Input() container!: string;

  activeId!: string;

  private _linksOffsets: { [key: string]: number } = {};
  private _scrollContainer?: HTMLElement | Window;
  private subscriptions = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _element: ElementRef,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.subscriptions.add(
      this._route.fragment.subscribe(fragment => {
        if (fragment != null) {
          this.activeId = fragment;

          const target = document.getElementById(this.activeId);
          if (target) {
            target.scrollIntoView();
          }
        }
      })
    );
  }
  navigateToSection(linkId: string) {
    document.querySelector(`#${linkId}`)?.scrollIntoView();
  }
  ngOnInit(): void {
    this._linksOffsets = this.toc
      .map(item => ({
        id: item.id,
        top: (
          document.querySelector(`#${item.id}`) as HTMLElement
        ).getBoundingClientRect().top
      }))
      .reduce((acc, curr) => ({ ...acc, [curr.id]: curr.top }), {});

    console.log(this._linksOffsets);

    this._scrollContainer = this.container
      ? (this._document.querySelector(this.container) as HTMLElement)
      : window;

    if (this._scrollContainer) {
      this.subscriptions.add(
        fromEvent(this._scrollContainer, 'scroll')
          .pipe(debounceTime(10))
          .subscribe(() => this.onScroll())
      );
    }
    this.navigateToSection(this.activeId);
  }
  private onScroll(): void {
    const scrollOffset = this.getScrollOffset();

    for (let i = 0; i < this.toc.length; i++) {
      // A link is considered active if the page is scrolled past the
      // anchor without also being scrolled passed the next link.
      const currentLinkId = this.toc[i].id;
      const nextLinkId = this.toc?.[i + 1]?.id;
      const isActive =
        scrollOffset >= this._linksOffsets[currentLinkId] &&
        (!nextLinkId || this._linksOffsets[nextLinkId] >= scrollOffset);

      console.log(scrollOffset);
      if (isActive && currentLinkId !== this.activeId) {
        this.activeId = currentLinkId;
        // TODO: detect changes
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /** Gets the scroll offset of the scroll container */
  private getScrollOffset(): number | void {
    const { top } = this._element.nativeElement.getBoundingClientRect();
    const container = this._scrollContainer;

    if (container instanceof HTMLElement) {
      return container.scrollTop + top;
    }

    if (container) {
      return container.scrollY + top;
    }
  }
}
