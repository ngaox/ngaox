import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsHeaderService {
  private _header: BehaviorSubject<string> = new BehaviorSubject('');

  getHeader(): BehaviorSubject<string> {
    return this._header;
  }

  setHeader(value: string) {
    this._header.next(value);
  }
}
