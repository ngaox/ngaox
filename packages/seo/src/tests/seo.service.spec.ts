import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';

import { SeoService } from '../lib/seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    metaService = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add all necessary meta tags', () => {
    const seoData = {
      title: 'Hello world!',
      description: 'This is a description',
      image: 'https://example.com/image.png',
      url: 'https://example.com/',
      type: 'website',
      siteName: 'Ngaox'
    };
    service.set(seoData);
    expect({
      title: metaService.getTag("property='og:title'")?.content,
      description: metaService.getTag("property='og:description'")?.content,
      image: metaService.getTag("property='og:image'")?.content,
      url: metaService.getTag("property='og:url'")?.content,
      type: metaService.getTag("property='og:type'")?.content,
      siteName: metaService.getTag("property='og:site_name'")?.content
    }).toEqual(seoData);
  });
});
