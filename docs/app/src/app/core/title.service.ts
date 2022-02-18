import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _title: BehaviorSubject<string> = new BehaviorSubject('');
  defaultTitle = 'Angular Ngaox';

  constructor(private bodyTitle: Title) {}

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
}
