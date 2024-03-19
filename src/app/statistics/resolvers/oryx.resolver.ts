import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, take, tap } from 'rxjs';
import {
  loadAllOryxDataAction,
  loadOryxDataForSideAction,
} from '../_store/actions/oryx.actions';
import { selectOryxSideLossesLoaded } from '../_store/selectors/oryx.selectors';
import { OryxSideNames } from '../_models/data/oryx/oryx.types';

export const oryxAllSidesResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  return combineLatest([
    store.select(selectOryxSideLossesLoaded(OryxSideNames.RUSSIA)),
    store.select(selectOryxSideLossesLoaded(OryxSideNames.UKRAINE)),
  ]).pipe(
    tap(([russiaLoaded, ukraineLoaded]) => {
      if (!russiaLoaded && !ukraineLoaded) {
        store.dispatch(loadAllOryxDataAction());
      } else {
        if (!russiaLoaded) {
          store.dispatch(
            loadOryxDataForSideAction({ side: OryxSideNames.RUSSIA })
          );
        }
        if (!ukraineLoaded) {
          store.dispatch(
            loadOryxDataForSideAction({ side: OryxSideNames.UKRAINE })
          );
        }
      }
    }),
    map(([russiaLoaded, ukraineLoaded]) => russiaLoaded && ukraineLoaded),
    filter((isLoaded) => !!isLoaded),
    take(1)
  );
};

export const oryxSideResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  const side = route.data['country'];

  return store.select(selectOryxSideLossesLoaded(side)).pipe(
    tap((isLoaded) => {
      if (!isLoaded) {
        store.dispatch(loadOryxDataForSideAction({ side }));
      }
    }),
    filter((isLoaded) => !!isLoaded),
    take(1)
  );
};
