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
import { StatisticEffects } from './statistic.effects';

@Injectable()
export class OryxEffects extends StatisticEffects {
  private _actions$ = inject(Actions);
  private _dataFetcher = inject(StatisticsFetcherService);

  queryOryxData$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadOryxDataAction),
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this._dataFetcher.getAllOryxData().pipe(
          map((data) => loadOryxDataActionSuccess({ data })),
          catchError((error: string) => of(loadOryxDataActionFailure()))
        )
      ),
      tap(() => this.setLoading(false))
    );
  });
}
