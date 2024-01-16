import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = $localize`:@@pageTitle:Data and infographic about russian invasion of Ukraine`;
  constructor(
    private _titleService: Title,
    private _router: Router,
    private _googleAnalyticsService: GoogleAnalyticsService
  ) {
    this._titleService.setTitle(this.title);
  }

  public ngOnInit(): void {
    this._googleAnalyticsService.processGoogleAnalytics();
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this._googleAnalyticsService.sendPageView(
          (event as NavigationEnd).urlAfterRedirects
        );
      });
  }
}
