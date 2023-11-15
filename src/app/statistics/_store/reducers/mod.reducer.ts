import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { MoDDayResultFlat } from '../../_models/data/mod/mod-model';
import { MoDEntityState } from '../_models/mod.entity-state';
import {
  loadMoDDataAction,
  loadMoDDataActionFailure,
  loadMoDDataActionSuccess,
} from '../actions/mod.actions';

export const modAdapter: EntityAdapter<MoDDayResultFlat> =
  createEntityAdapter<MoDDayResultFlat>({
    selectId: (modResult: MoDDayResultFlat) => modResult.date,
  });

export const initialStateMoD: MoDEntityState = modAdapter.getInitialState({
  loadingInProgress: false,
  dataLoaded: false,
});

export const modReducer = createReducer(
  initialStateMoD,
  on(
    loadMoDDataAction,
    (state): MoDEntityState =>
      modAdapter.setAll([], {
        ...state,
        dataLoaded: false,
        loadingInProgress: true,
      })
  ),
  on(
    loadMoDDataActionSuccess,
    (state, { data }): MoDEntityState =>
      modAdapter.setAll(data, {
        ...state,
        dataLoaded: true,
        loadingInProgress: false,
      })
  ),
  on(
    loadMoDDataActionFailure,
    (state): MoDEntityState =>
      modAdapter.setAll([], {
        ...state,
        dataLoaded: false,
        loadingInProgress: false,
      })
  )
);
