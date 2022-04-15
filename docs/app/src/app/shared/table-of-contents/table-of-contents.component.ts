import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  AfterViewInit
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
export class TableOfContentsComponent implements OnDestroy, AfterViewInit {
  _toc: ITocLink[] = [];
  @Input() container!: string;

  activeId?: string;

  get toc(): ITocLink[] {
    return this._toc;
  }

  @Input()
  set toc(toc: ITocLink[]) {
    this._toc = toc;
    this.calculateOffsets(true);
  }

  private _linksOffsets: { [key: string]: number } = {};
  private _scrollContainer?: HTMLElement | Window;
  private subscriptions = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: Document,
    private _ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.subscriptions.add(
      this._route.fragment.subscribe(fragment => {
        if (fragment != null) {
          this.activeId = fragment;
          this.navigateToSection(this.activeId);
        }
      })
    );
    // On init, the sidenav content element doesn't yet exist, so it's not possible
    // to subscribe to its scroll event until next tick (when it does exist).
    this._ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        this._scrollContainer = this._document.querySelector(
          this.container
        ) as HTMLElement;

        if (this._scrollContainer) {
          this.subscriptions.add(
            fromEvent(this._scrollContainer, 'scroll')
              .pipe(debounceTime(10))
              .subscribe(() => this.onScroll())
          );
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  calculateOffsets(force = false) {
    if (this.toc.length < 0) {
      this._linksOffsets = {};
      return;
    }
    const itemId = this.toc[this.toc.length - 1].id;
    const currentTop = (
      document.querySelector(`#${itemId}`) as HTMLElement
    ).getBoundingClientRect().top;
    if (currentTop !== this._linksOffsets[itemId] || force) {
      this._linksOffsets = this.toc
        .map(item => ({
          id: item.id,
          top: (
            document.querySelector(`#${item.id}`) as HTMLElement
          ).getBoundingClientRect().top
        }))
        .reduce((acc, curr) => ({ ...acc, [curr.id]: curr.top }), {});
    }
  }

  navigateToSection(linkId: string) {
    const container = this._scrollContainer;
    if (container) {
      const scrollTop =
        this._linksOffsets[linkId] - this.activeHeaderOffset(container) + 10;
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }

  private onScroll(): void {
    this.calculateOffsets();
    const container = this._scrollContainer as HTMLElement | Window;
    const scrollOffset =
      this.getScrollTop(container) + this.activeHeaderOffset(container);
    let hasChanged = false;
    let found = false;
    for (let i = 0; i < this.toc.length; i++) {
      // A link is considered active if the page is scrolled past the
      // anchor without also being scrolled passed the next link.
      const currentLinkId = this.toc[i].id;
      const nextLinkId = this.toc?.[i + 1]?.id;

      const isActive =
        scrollOffset >= this._linksOffsets[currentLinkId] &&
        (!nextLinkId || this._linksOffsets[nextLinkId] > scrollOffset);

      if (isActive) {
        if (currentLinkId !== this.activeId) {
          this.activeId = currentLinkId;
          hasChanged = true;
        }
        found = true;
        break;
      }
    }
    if (this.activeId && !found) {
      this.activeId = undefined;
      hasChanged = true;
    }
    if (hasChanged) {
      // The scroll listener runs outside of the Angular zone so
      // we need to bring it back in only when something has changed.
      this._ngZone.run(() => this._changeDetectorRef.markForCheck());
    }
  }

  private getScrollTop(container: HTMLElement | Window): number {
    return container instanceof HTMLElement
      ? container.scrollTop
      : container.scrollY;
  }

  private activeHeaderOffset(container: HTMLElement | Window): number {
    return container instanceof HTMLElement
      ? 100 + container.getBoundingClientRect().top
      : 100;
  }
}
