import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgZone,
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
export class TableOfContentsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() toc: ITocLink[] = [];
  @Input() container!: string;

  activeId?: string;

  private _linksOffsets: { [key: string]: number } = {};
  private _scrollContainer?: HTMLElement | Window;
  private subscriptions = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: Document,
    private _ngZone: NgZone
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
    // On init, the sidenav content element doesn't yet exist, so it's not possible
    // to subscribe to its scroll event until next tick (when it does exist).
    this._ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        this._linksOffsets = this.toc
          .map(item => ({
            id: item.id,
            top: (
              document.querySelector(`#${item.id}`) as HTMLElement
            ).getBoundingClientRect().top
          }))
          .reduce((acc, curr) => ({ ...acc, [curr.id]: curr.top }), {});

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
  private onScroll(): void {
    const scrollOffset = this.getScrollOffset();
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.activeId) {
      this.navigateToSection(this.activeId);
    }
  }

  /** Gets the scroll offset of the scroll container */
  private getScrollOffset(): number | void {
    const container = this._scrollContainer;

    if (container instanceof HTMLElement) {
      const { top } = container.getBoundingClientRect();
      return container.scrollTop + (container.clientHeight * 4) / 5 + top;
    }

    if (container) {
      return container.scrollY + container.innerHeight;
    }
  }
}
