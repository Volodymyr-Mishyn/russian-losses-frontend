import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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

  queryMoDData$ = createEffect(() => {
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
