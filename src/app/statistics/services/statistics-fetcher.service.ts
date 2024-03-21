import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { MoDDataFlat } from '../_models/data/mod/mod-model';
import { OryxSideLosses } from '../_models/data/oryx/oryx-model';
import { OryxSide, OryxSideNames } from '../_models/data/oryx/oryx.types';
import { BaseUrlBuilderService } from './base-url-builder.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsFetcherService {
  private _baseAPIUrl: string = this._baseUrlBuilderService.getApiBaseUrl();
  constructor(
    private _httpClient: HttpClient,
    private _baseUrlBuilderService: BaseUrlBuilderService
  ) {}

  private _createOryxSideLossesRequest(
    sideName: OryxSideNames
  ): Observable<OryxSideLosses> {
    return this._httpClient.get<OryxSideLosses>(`${this._baseAPIUrl}/oryx`, {
      params: { country: sideName },
    });
  }

  public getMoDData(): Observable<MoDDataFlat> {
    return this._httpClient.get<MoDDataFlat>(`${this._baseAPIUrl}/mod`, {
      params: { flat: true },
    });
  }

  public getOryxData(side: OryxSide): Observable<OryxSideLosses> {
    return this._createOryxSideLossesRequest(side);
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
