import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { imageData, PageSeoData } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject('Defaults') private defaults: PageSeoData = {}
  ) {}

  public generateTags(definitions: MetaDefinition[]): void {
    definitions.forEach(meta => {
      this.meta.updateTag(meta);
    });
  }

  public set(seoData: PageSeoData) {
    seoData = {
      ...this.defaults,
      ...seoData
    };
    if (seoData.title) this.setTitle(seoData.title);
    if (seoData.keywords) this.setKeywords(seoData.keywords);
    if (seoData.description) this.setDescription(seoData.description);
    if (seoData.url) this.setUrl(seoData.url);
    if (seoData.type) this.setType(seoData.type);
    if (seoData.image) this.setImage(seoData.image, seoData.imageData);
    if (seoData.twitterCreator) this.setTwitterCreator(seoData.twitterCreator);
    if (seoData.twitterCard) this.setTwitterCard(seoData.twitterCard);
    if (seoData.fbAppId) this.setFbAppId(seoData.fbAppId);
    if (seoData.siteName) this.setSiteName(seoData.siteName);
  }

  public setTitle(title: string): void {
    this.title.setTitle(title);
    this.generateTags([
      { property: 'og:title', content: title },
      { name: 'twitter:title', content: title },
      { name: 'title', content: title }
    ]);
  }

  public setKeywords(keywords: string): void {
    this.generateTags([{ name: 'keywords', content: keywords }]);
  }

  public setDescription(description: string): void {
    this.generateTags([
      { name: 'description', content: description },
      { property: 'og:description', content: description },
      { name: 'twitter:description', content: description }
    ]);
  }

  public setUrl(url: string): void {
    this.generateTags([{ property: 'og:url', content: url }]);
    // set canonical link
    const oldElement = this.document.head.querySelector(
      `link[rel='canonical']`
    );
    if (oldElement) {
      this.document.head.removeChild(oldElement);
    }
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  public setType(type: string): void {
    this.generateTags([{ property: 'og:type', content: type }]);
  }

  public setImage(image: string, extra?: imageData): void {
    this.generateTags([
      { property: 'og:image', content: image },
      { name: 'twitter:image', content: image },
      { property: 'image', content: image }
    ]);
    if (image.startsWith('https')) {
      this.generateTags([{ property: 'og:image:secure_url', content: image }]);
    }
    if (extra) {
      if (extra.alt) {
        this.generateTags([
          { property: 'twitter:image:alt', content: extra.alt },
          { property: 'og:image:alt', content: extra.alt }
        ]);
      }
      if (extra.height) {
        this.generateTags([
          { property: 'og:image:height', content: extra.height.toString() }
        ]);
      }
      if (extra.width) {
        this.generateTags([
          { property: 'og:image:width', content: extra.width.toString() }
        ]);
      }
      if (extra.width) {
        this.generateTags([
          { property: 'og:image:type', content: `${extra.mimeType}` }
        ]);
      }
    }
  }

  public setTwitterCreator(username: string): void {
    this.generateTags([
      { name: 'twitter:site', content: username },
      { name: 'twitter:creator', content: username }
    ]);
  }

  public setTwitterCard(twitterCard: 'summary_large_image' | 'summary'): void {
    this.generateTags([{ name: 'twitter:card', content: twitterCard }]);
  }

  public setFbAppId(Id: string): void {
    this.generateTags([{ property: 'fb:app_id', content: Id }]);
  }

  public setSiteName(siteName: string): void {
    this.generateTags([{ property: 'og:site_name', content: siteName }]);
  }
}
