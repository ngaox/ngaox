import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _title: BehaviorSubject<string> = new BehaviorSubject('GG');
  defaultTitle = 'Ngaox';

  getTitle(): BehaviorSubject<string> {
    return this._title;
  }

  setTitle(title: string) {
    this._title.next(title);
    if (title !== '') {
      title = `${title} | Ngaox`;
    } else {
      title = this.defaultTitle;
    }
    this.bodyTitle.setTitle(title);
  }

  constructor(private bodyTitle: Title) {}
}
