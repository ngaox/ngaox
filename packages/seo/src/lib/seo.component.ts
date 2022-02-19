import { Component, Input } from '@angular/core';
import { ISeoImage, ISeoTwitter } from './shared/modals';
import { SeoService } from './seo.service';

@Component({
  selector: 'ngaox-seo',
  template: ``,
  styles: []
})
export class SeoComponent {
  constructor(private seoService: SeoService) {}

  @Input()
  set title(value: string) {
    this.seoService.setTitle(value);
  }
  @Input()
  set keywords(value: string) {
    this.seoService.setKeywords(value);
  }
  @Input()
  set description(value: string) {
    this.seoService.setDescription(value);
  }
  @Input()
  set url(value: string) {
    this.seoService.setUrl(value);
  }
  @Input()
  set type(value: string) {
    this.seoService.setType(value);
  }
  @Input()
  set image(value: string | ISeoImage) {
    this.seoService.setImage(value);
  }
  @Input()
  set twitter(value: ISeoTwitter) {
    this.seoService.setTwitter(value);
  }
  @Input()
  set fbAppId(value: string) {
    this.seoService.setFbAppId(value);
  }
  @Input()
  set siteName(value: string) {
    this.seoService.setSiteName(value);
  }
}
