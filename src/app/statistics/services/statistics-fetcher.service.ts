import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { MoDDataFlat } from '../_models/data/mod/mod-model';
import { OryxSideLosses } from '../_models/data/oryx/oryx-model';
import { OryxSide, OryxSideNames } from '../_models/data/oryx/oryx.types';

@Injectable({
  providedIn: 'root',
})
export class StatisticsFetcherService {
  private static _baseAPIUrl: string = environment.apiUrl;
  constructor(private _httpClient: HttpClient) {}

  private _createOryxSideLossesRequest(
    sideName: OryxSideNames
  ): Observable<OryxSideLosses> {
    return this._httpClient.get<OryxSideLosses>(
      `${StatisticsFetcherService._baseAPIUrl}/oryx`,
      {
        params: { country: sideName },
      }
    );
  }

  public getMoDData(): Observable<MoDDataFlat> {
    return this._httpClient.get<MoDDataFlat>(
      `${StatisticsFetcherService._baseAPIUrl}/mod`,
      {
        params: { flat: true },
      }
    );
  }

  public getAllOryxData(): Observable<{ [k in OryxSide]: OryxSideLosses }> {
    const russianLosses$ = this._createOryxSideLossesRequest(
      OryxSideNames.RUSSIA
    );
    const ukrainianLosses$ = this._createOryxSideLossesRequest(
      OryxSideNames.UKRAINE
    );
    return forkJoin({
      [OryxSideNames.RUSSIA]: russianLosses$,
      [OryxSideNames.UKRAINE]: ukrainianLosses$,
    });
  }
}
