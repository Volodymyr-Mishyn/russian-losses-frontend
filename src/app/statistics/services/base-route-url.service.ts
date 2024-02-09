import { Injectable } from '@angular/core';
import { PlatformService } from '../../services/platform.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BaseRouteUrlService {
  constructor(
    private _platformService: PlatformService,
    private _location: Location,
    private _router: Router
  ) {}

  public getBaseUrl(): null | string {
    if (!this._platformService.isRunningOnBrowser()) {
      return null;
    }
    return (
      window.location.origin +
      this._location.prepareExternalUrl(this._router.url)
    );
  }
}
