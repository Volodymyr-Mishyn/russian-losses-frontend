import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMoDDataLoaded } from '../_store/selectors/mod.selectors';
import { filter, take, tap } from 'rxjs';
import { loadMoDDataAction } from '../_store/actions/mod.actions';

export const ministryOfDefenseResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);

  return store.select(selectMoDDataLoaded).pipe(
    tap((isLoaded) => {
      if (!isLoaded) {
        store.dispatch(loadMoDDataAction());
      }
    }),
    filter((isLoaded) => !!isLoaded),
    take(1)
  );
};
