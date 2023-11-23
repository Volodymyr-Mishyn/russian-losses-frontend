import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoDDataFlat } from '../_models/data/mod/mod-model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsFetcherService {
  private static _baseAPIUrl: string = environment.apiUrl;
  constructor(private _httpClient: HttpClient) {}

  public getMoDData(): Observable<MoDDataFlat> {
    return this._httpClient.get<MoDDataFlat>(
      `${StatisticsFetcherService._baseAPIUrl}/mod`,
      {
        params: { flat: true },
      }
    );
  }
}
