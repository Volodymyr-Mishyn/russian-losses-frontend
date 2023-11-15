import { createFeatureSelector, createSelector } from '@ngrx/store';
import { modAdapter } from '../reducers/mod.reducer';
import { MoDEntityState } from '../_models/mod.entity-state';

export const selectMoDState = createFeatureSelector<MoDEntityState>('mod');

export const { selectAll, selectIds, selectEntities } =
  modAdapter.getSelectors();

export const selectAllMoDData = createSelector(selectMoDState, selectAll);

export const selectMoDDataLoaded = createSelector(
  selectMoDState,
  (state) => state.dataLoaded
);
