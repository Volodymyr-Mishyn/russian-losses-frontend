import { createFeatureSelector, createSelector } from '@ngrx/store';
import { modAdapter } from '../reducers/mod.reducer';
import { MoDEntityState } from '../_models/mod.entity-state';
import { MoDDayResultFlat } from '../../_models/data/mod/mod-model';
import { calculateMoDSliceData } from '../_helpers/mod/mod-calculation.utils';
import { DateRange } from '../../_models/range';

export const selectMoDState = createFeatureSelector<MoDEntityState>('mod');

export const { selectAll, selectIds, selectEntities, selectTotal } =
  modAdapter.getSelectors();

export const selectAllMoDData = createSelector(selectMoDState, selectAll);

export const selectMoDDataLoaded = createSelector(
  selectMoDState,
  (state) => state.dataLoaded
);

export const selectMoDSummary = createSelector(
  selectMoDState,
  (state) => state.summaryData
);
export const selectMoDAverage = createSelector(
  selectMoDState,
  (state) => state.averageData
);

export const selectMoDDataSize = createSelector(selectMoDState, selectTotal);

export const selectMoDDataInRange = ({ start, end }: DateRange) => {
  return createSelector(selectAllMoDData, (modData) => {
    return modData.filter((dayData) => {
      const entityDate = new Date(dayData.date);
      return entityDate >= start && entityDate <= end;
    });
  });
};

export const selectMoDDataInRangeWithCalculation = (
  selection: DateRange | null
) => {
  const dataSelector =
    selection === null ? selectAllMoDData : selectMoDDataInRange(selection);
  return createSelector(dataSelector, (modResult: Array<MoDDayResultFlat>) => {
    return calculateMoDSliceData(modResult);
  });
};
