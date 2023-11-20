import { createFeatureSelector, createSelector } from '@ngrx/store';
import { modAdapter } from '../reducers/mod.reducer';
import { MoDEntityState } from '../_models/mod.entity-state';

export const selectMoDState = createFeatureSelector<MoDEntityState>('mod');

export const { selectAll, selectIds, selectEntities, selectTotal } =
  modAdapter.getSelectors();

export const selectAllMoDData = createSelector(selectMoDState, selectAll);

export const selectMoDDataLoaded = createSelector(
  selectMoDState,
  (state) => state.dataLoaded
);

export const selectModDataInRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return createSelector(selectAllMoDData, (modData) => {
    return modData.filter((dayData) => {
      const entityDate = new Date(dayData.date);
      return entityDate >= startDate && entityDate <= endDate;
    });
  });
};
