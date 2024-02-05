import { Injectable } from '@angular/core';
import { PlatformService } from '../../services/platform.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlBuilderService {
  constructor(private _platformService: PlatformService) {}

  public getApiBaseUrl(): string {
    if (this._platformService.isRunningOnBrowser()) {
      const isLocalhost =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '192.168.0.116';
      if (environment.production && isLocalhost) {
        return environment.backendUrl + environment.apiUrl;
      }
      return environment.apiUrl;
    } else {
      return environment.backendUrl + environment.apiUrl;
    }
  }
}
