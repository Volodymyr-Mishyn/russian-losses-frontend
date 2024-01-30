import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATE_OF_INVASION_INSTANCE } from '../../_constants/russian-invasion-date';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public title = $localize`:@@pageTitleHome:Data and infographic about russian invasion of Ukraine`;
  public ogTitle = $localize`:@@ogTitleHome:Russian losses in Ukraine: In-Depth statistics and infographic`;
  public ogDescription = $localize`:@@ogDescriptionHome:Constantly updating data about Russian losses in the ongoing Russian invasion of Ukraine`;

  private _currentDate = new Date();

  public daysCount = 0;

  constructor(private _seoService: SeoService) {
    const timeDifference =
      this._currentDate.getTime() - DATE_OF_INVASION_INSTANCE.getTime();
    this.daysCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  }

  private _setMetaTags(): void {
    this._seoService.updateTitle(this.title);
    this._seoService.updateMetaTags([
      { name: 'og:title', content: this.ogTitle },
      { name: 'og:description', content: this.ogDescription },
      { name: 'twitter:title', content: this.ogTitle },
      { name: 'twitter:description', content: this.ogDescription },
    ]);
  }

  public ngOnInit(): void {
    this._setMetaTags();
  }
}
