import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { MoDDayResultFlat } from '../../_models/data/mod/mod-model';
import { MoDEntityState } from '../_models/mod.entity-state';
import {
  loadMoDDataAction,
  loadMoDDataActionFailure,
  loadMoDDataActionSuccess,
} from '../actions/mod.actions';
import {
  calculateAverage,
  calculateSummary,
} from '../_helpers/mod/mod-calculation.utils';

export const modAdapter: EntityAdapter<MoDDayResultFlat> =
  createEntityAdapter<MoDDayResultFlat>({
    selectId: (modResult: MoDDayResultFlat) => modResult.date,
    sortComparer: (first: MoDDayResultFlat, second: MoDDayResultFlat) =>
      second.dayOfInvasion - first.dayOfInvasion,
  });

export const initialStateMoD: MoDEntityState = modAdapter.getInitialState({
  loadingInProgress: false,
  dataLoaded: false,
  averageData: null,
  summaryData: null,
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
  on(loadMoDDataActionSuccess, (state, { data }): MoDEntityState => {
    const averageData = calculateAverage(data);
    const summaryData = calculateSummary(data);
    return modAdapter.setAll(data, {
      ...state,
      dataLoaded: true,
      loadingInProgress: false,
      summaryData,
      averageData,
    });
  }),
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
