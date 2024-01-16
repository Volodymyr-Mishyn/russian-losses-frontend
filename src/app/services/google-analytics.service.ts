import { Injectable, isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlatformService } from './platform.service';
import { GoogleAnalyticsSnackbarComponent } from './google-analytics-snackbar/google-analytics-snackbar.component';
import { take } from 'rxjs';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private _askForConsentCoolDown = 10;

  private _userConsent: boolean = false;
  private _googleTag = 'G-636PZZN0Y2';

  constructor(
    private _snackBar: MatSnackBar,
    private _platformService: PlatformService
  ) {}

  private _processUserConsent(answer: boolean): void {
    if (answer) {
      localStorage.removeItem('analyticsConsent.value');
      localStorage.removeItem('analyticsConsent.date');
      localStorage.setItem('analyticsConsent.value', 'true');
      this._userConsent = true;
    } else {
      localStorage.setItem('analyticsConsent.value', 'false');
      const currentDate = new Date();
      localStorage.setItem('analyticsConsent.date', currentDate.toISOString());
      this._userConsent = false;
    }
  }

  private _showConsentSnackbar(): void {
    const snackbar = this._snackBar.openFromComponent(
      GoogleAnalyticsSnackbarComponent
    );
    snackbar.instance.optionSelected$.pipe(take(1)).subscribe((answer) => {
      this._processUserConsent(answer);
    });
  }

  private _processGoogleAnalytics(): void {
    const consent = localStorage.getItem('analyticsConsent.value');
    const consentValueStored = consent !== null;
    if (!consentValueStored) {
      this._showConsentSnackbar();
      return;
    }
    const consentValue = consent === 'true';
    this._userConsent = consentValue;

    if (consentValueStored && !consentValue) {
      const consentValueDate = localStorage.getItem('analyticsConsent.date');
      if (consentValueDate) {
        const currentDate = new Date();
        const pastDate = new Date(consentValueDate);
        const differenceInTime = currentDate.getTime() - pastDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        if (differenceInDays >= this._askForConsentCoolDown) {
          this._showConsentSnackbar();
        }
      }
    }
  }

  private _isDevMode(): boolean {
    if (this._platformService.isRunningOnBrowser()) {
      const isLocalhost = window.location.hostname === 'localhost';
      return isLocalhost || isDevMode();
    }
    return isDevMode();
  }

  private _checkAnalyticsAllowedAndAvailable(): boolean {
    if (this._isDevMode()) {
      return false;
    }
    if (!this._platformService.isRunningOnBrowser()) {
      return false;
    }
    return this._userConsent;
  }

  public processGoogleAnalytics(): void {
    if (this._isDevMode()) {
      return;
    }
    if (!this._platformService.isRunningOnBrowser()) {
      return;
    }
    this._processGoogleAnalytics();
  }

  public sendPageView(url: string): void {
    if (!this._checkAnalyticsAllowedAndAvailable()) {
      return;
    }
    if (gtag) {
      gtag('config', this._googleTag, {
        page_path: url,
      });
    }
  }

  public sendEvent(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string | null = null,
    eventValue: number | null = null
  ): void {
    if (!this._checkAnalyticsAllowedAndAvailable()) {
      return;
    }
    if (gtag) {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_action: eventAction,
        event_label: eventLabel,
        event_value: eventValue,
      });
    }
  }
}
