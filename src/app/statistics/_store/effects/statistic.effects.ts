import { NgZone, inject } from '@angular/core';
import { LoadingIndicationService } from '../../services/loading-indication.service';
import { PlatformService } from '../../../services/platform.service';

export abstract class StatisticEffects {
  private _loadingIndicationService = inject(LoadingIndicationService);
  private _ngZone = inject(NgZone);
  private _platformService = inject(PlatformService);

  protected setLoading(value: boolean): void {
    if (this._platformService.isRunningOnBrowser()) {
      if (value === true) {
        this._loadingIndicationService.setLoading(true);
      } else {
        setTimeout(() => {
          this._ngZone.run(() => {
            this._loadingIndicationService.setLoading(false);
          });
        }, 20);
      }
    }
  }
}
