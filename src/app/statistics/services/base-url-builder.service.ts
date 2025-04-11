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
      return environment.apiUrl;
    } else {
      return environment.serverApiUrl + environment.apiUrl;
    }
  }
}
