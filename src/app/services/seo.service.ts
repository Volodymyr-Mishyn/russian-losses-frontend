import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { LANGUAGES } from '../_constants/languages';
import { LOCALE_LANGUAGE_MAP } from '../_helpers/lanaguage-locale-map';

export interface MetaTag {
  name: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private _titleService: Title,
    private _metaService: Meta,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(LOCALE_ID) private _locale: string
  ) {}

  private _removeHreflangLinks(): void {
    const existingTags: NodeListOf<HTMLLinkElement> =
      this._document.head.querySelectorAll("link[rel='alternate'][hreflang]");
    existingTags.forEach((tag) => tag.remove());
  }

  private _updateCanonicalUrl(link: string): void {
    const head = this._document.querySelector('head');
    if (!head) {
      return;
    }
    const existingCanonicalLink = this._document.querySelector(
      'link[rel="canonical"]'
    );

    const url = `${environment.deployUrl}/${
      LOCALE_LANGUAGE_MAP[this._locale]
    }/${link}`;

    if (existingCanonicalLink) {
      existingCanonicalLink.setAttribute('href', url);
    } else {
      const link: HTMLLinkElement = this._document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
      link.setAttribute('href', url);
    }
  }

  private _updateHreflangLinks(link: string): void {
    const head = this._document.querySelector('head');
    if (!head) {
      return;
    }
    this._removeHreflangLinks();
    LANGUAGES.map((l) => l.baseHref).forEach((language) => {
      const linkElement: HTMLLinkElement = this._document.createElement('link');
      linkElement.setAttribute('rel', 'alternate');
      linkElement.setAttribute('hreflang', language);
      head.appendChild(linkElement);
      linkElement.setAttribute(
        'href',
        `${environment.deployUrl}/${language}/${link}`
      );
    });
  }

  public updateTitle(title: string): void {
    this._titleService.setTitle(title);
  }

  public updateMetaTags(tags: Array<MetaTag>): void {
    tags.forEach((tag) => {
      this._metaService.updateTag({ name: tag.name, content: tag.content });
    });
  }

  public setLinkDataTags(link: string): void {
    this._updateCanonicalUrl(link);
    this._updateHreflangLinks(link);
  }
}
