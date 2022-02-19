import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { SeoComponent } from '../lib/seo.component';

describe('SeoComponent', () => {
  let component: SeoComponent;
  let fixture: ComponentFixture<SeoComponent>;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    fixture.detectChanges();
  });

  it('initialized properly', () => {
    expect(component).toBeTruthy();
  });
  it('sets the correct meta tags and title', () => {
    const seoData = {
      title: 'Hello world!',
      description: 'This is a description',
      image: 'https://example.com/image.png',
      url: 'https://example.com/',
      type: 'website',
      siteName: 'Ngaox'
    };
    component.title = seoData.title;
    component.description = seoData.description;
    component.image = seoData.image;
    component.url = seoData.url;
    component.type = seoData.type;
    component.siteName = seoData.siteName;
    expect(titleService.getTitle()).toEqual(seoData.title);
    expect(metaService.getTag("property='og:title'")?.content).toEqual(
      'Hello world!'
    );
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
