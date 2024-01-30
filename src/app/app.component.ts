import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { filter } from 'rxjs';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = $localize`:@@pageTitle:Data and infographic about russian losses during invasion of Ukraine`;
  public ogTitle = $localize`:@@ogTitle:Russian losses in Ukraine: In-Depth statistics and infographic`;
  public ogDescription = $localize`:@@ogDescription:Constantly updating data about Russian losses in the ongoing Russian invasion of Ukraine`;

  constructor(
    private _router: Router,
    private _googleAnalyticsService: GoogleAnalyticsService,
    private _seoService: SeoService
  ) {}

  private _setGoogleAnalytics(): void {
    this._googleAnalyticsService.processGoogleAnalytics();
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this._googleAnalyticsService.sendPageView(
          (event as NavigationEnd).urlAfterRedirects
        );
      });
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
    this._setGoogleAnalytics();
    this._setMetaTags();
  }
}
