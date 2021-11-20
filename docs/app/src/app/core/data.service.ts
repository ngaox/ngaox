import { Injectable } from '@angular/core';
import { DocSection } from 'docs/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _currentDocSection?: DocSection;

  constructor() {}

  setCurrentDocSection(item: DocSection) {
    this._currentDocSection = item;
  }
  getCurrentDocSection() {
    return this._currentDocSection;
  }
}
