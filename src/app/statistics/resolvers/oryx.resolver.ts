import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { loadOryxDataAction } from '../_store/actions/oryx.actions';
import { selectOryxDataLoaded } from '../_store/selectors/oryx.selectors';

export const oryxResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);

  return store.select(selectOryxDataLoaded).pipe(
    tap((isLoaded) => {
      if (!isLoaded) {
        store.dispatch(loadOryxDataAction());
      }
    }),
    filter((isLoaded) => !!isLoaded),
    take(1)
  );
};
