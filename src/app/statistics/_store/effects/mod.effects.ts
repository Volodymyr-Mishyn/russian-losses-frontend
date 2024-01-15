import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StatisticsFetcherService } from '../../services/statistics-fetcher.service';
import {
  loadMoDDataAction,
  loadMoDDataActionFailure,
  loadMoDDataActionSuccess,
} from '../actions/mod.actions';
import { StatisticEffects } from './statistic.effects';

@Injectable()
export class MoDEffects extends StatisticEffects {
  private _actions$ = inject(Actions);
  private _dataFetcher = inject(StatisticsFetcherService);

  queryMoDData$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadMoDDataAction),
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this._dataFetcher.getMoDData().pipe(
          map((data) => loadMoDDataActionSuccess({ data })),
          catchError((error: string) => of(loadMoDDataActionFailure()))
        )
      ),
      tap(() => this.setLoading(false))
    );
  });
}
