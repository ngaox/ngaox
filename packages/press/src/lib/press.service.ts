import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CONTENT_MAP_FILE, CONTENT_PATH, LEADERBOARD_PATH } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PressService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  get baseHref(): string {
    return this.document.baseURI;
  }

  getDocPath(contentKey: string, path: string) {
    return `${this.getContentPath()}/${contentKey}/${path}`;
  }

  getContentPath() {
    return `${this.baseHref}/${CONTENT_PATH}`;
  }

  getContentMapPath(contentKey: string) {
    return `${this.getContentPath()}/${contentKey}/${CONTENT_MAP_FILE}`;
  }

  /** Only when using Contests builder */
  getLeaderboardPath(contentKey: string) {
    return `${this.getContentPath()}/${contentKey}/${LEADERBOARD_PATH}`;
  }
}
