import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StatisticsFetcherService } from '../../services/statistics-fetcher.service';
import {
  loadOryxDataAction,
  loadOryxDataActionFailure,
  loadOryxDataActionSuccess,
} from '../actions/oryx.actions';

@Injectable()
export class OryxEffects {
  private _actions$ = inject(Actions);
  private _dataFetcher = inject(StatisticsFetcherService);

  queryOryxData$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadOryxDataAction),
      switchMap(() =>
        this._dataFetcher.getAllOryxData().pipe(
          map((data) => loadOryxDataActionSuccess({ data })),
          tap((data) => console.log(data)),
          catchError((error: string) => of(loadOryxDataActionFailure()))
        )
      )
    );
  });
}
