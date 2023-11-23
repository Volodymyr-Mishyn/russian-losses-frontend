/* eslint-disable arrow-body-style */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigatedAction } from '@ngrx/router-store';
import { StatisticsFetcherService } from '../../services/statistics-fetcher.service';
import {
  loadMoDDataAction,
  loadMoDDataActionFailure,
  loadMoDDataActionSuccess,
} from '../actions/mod.actions';

@Injectable()
export class MoDEffects {
  private _actions$ = inject(Actions);
  private _dataFetcher = inject(StatisticsFetcherService);

  queryExpenses$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadMoDDataAction),
      switchMap(() =>
        this._dataFetcher.getMoDData().pipe(
          map((data) => loadMoDDataActionSuccess({ data })),
          catchError((error: string) => of(loadMoDDataActionFailure()))
        )
      )
    );
  });

  constructor() {}
}
