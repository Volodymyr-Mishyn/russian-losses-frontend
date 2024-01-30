import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface MetaTag {
  name: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private _titleService: Title, private _metaService: Meta) {}

  public updateTitle(title: string): void {
    this._titleService.setTitle(title);
  }

  public updateMetaTags(tags: Array<MetaTag>): void {
    tags.forEach((tag) => {
      this._metaService.updateTag({ name: tag.name, content: tag.content });
    });
  }
}
