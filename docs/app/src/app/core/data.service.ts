import { Injectable } from '@angular/core';
import { IDocsItem } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _currentDocItem?: IDocsItem;

  setCurrentDocsItem(item: IDocsItem) {
    this._currentDocItem = item;
  }
  getCurrentDocsItem() {
    return this._currentDocItem;
  }
}
