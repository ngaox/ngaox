import { Component, Input, OnInit } from '@angular/core';
import { IPageSeoData, ISeoImage, ISeoTwitter } from './shared/models';
import { SeoService } from './seo.service';
import { MetaDefinition } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'ngaox-seo',
  template: ''
})
export class NgaoxSeoComponent implements OnInit {
  seoData: IPageSeoData = {};

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.set(this.seoData);
  }

  @Input()
  set title(value: string) {
    this.seoData.title = value;
    this.seoService.setTitle(value);
  }
  @Input()
  set keywords(value: string) {
    this.seoData.keywords = value;
    this.seoService.setKeywords(value);
  }
  @Input()
  set description(value: string) {
    this.seoData.description = value;
    this.seoService.setDescription(value);
  }
  @Input()
  set url(value: string) {
    this.seoData.url = value;
    this.seoService.setUrl(value);
  }
  @Input()
  set type(value: string) {
    this.seoData.type = value;
    this.seoService.setType(value);
  }
  @Input()
  set image(value: string | ISeoImage) {
    this.seoData.image = value;
    this.seoService.setImage(value);
  }
  @Input()
  set twitter(value: ISeoTwitter) {
    this.seoData.twitter = value;
    this.seoService.setTwitter(value);
  }
  @Input()
  set fbAppId(value: string) {
    this.seoData.fbAppId = value;
    this.seoService.setFbAppId(value);
  }
  @Input()
  set siteName(value: string) {
    this.seoData.siteName = value;
    this.seoService.setSiteName(value);
  }

  @Input()
  set extra(value: MetaDefinition[]) {
    this.seoData.extra = value;
    this.seoService.generateTags(value);
  }
}
