import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  public title = $localize`:@@pageTitleAbout:About me & about this application of russian losses in Ukraine`;
  public ogTitle = $localize`:@@ogTitleAbout:About me & about this application of russian losses in Ukraine`;
  public ogDescription = $localize`:@@ogDescriptionAbout:About me & about this application of russian losses in Ukraine`;

  constructor(private _seoService: SeoService) {}

  private _setMetaTags(): void {
    this._seoService.updateTitle(this.title);
    this._seoService.updateMetaTags([
      { name: 'og:title', content: this.ogTitle },
      { name: 'og:description', content: this.ogDescription },
      { name: 'twitter:title', content: this.ogTitle },
      { name: 'twitter:description', content: this.ogDescription },
    ]);
    this._seoService.setLinkDataTags('statistics/about');
  }

  public ngOnInit(): void {
    this._setMetaTags();
  }
}
