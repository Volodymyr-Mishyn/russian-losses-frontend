import { createFeatureSelector, createSelector } from '@ngrx/store';
import { modAdapter } from '../reducers/mod.reducer';
import { MoDEntityState } from '../_models/mod.entity-state';
import {
  CalculatedIncrement,
  EntityLossFlat,
  MoDDataFlat,
  MoDDataSliceWithCalculated,
  MoDDayResultData,
  MoDDayResultFlat,
} from '../../_models/data/mod/mod-model';
import {
  calculateAverage,
  calculateSummary,
} from '../_helpers/mod-calculation.utils';
import { DateRange } from '../../_models/range';
import { EntityNamesEnum } from '../../_models/data/mod/mod-entities';

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
    const averageData = calculateAverage(modResult);
    const summaryData = calculateSummary(modResult);
    const updatedMoDData: MoDDataFlat = modResult.map((dayResult) => {
      const { data } = dayResult;
      const updatedData: MoDDayResultData = Object.fromEntries(
        Object.entries(data).map(([key, entityLoss]) => {
          const keyName = key as EntityNamesEnum;
          const averageDataForEntity = averageData[keyName];
          const summaryDataForEntity = summaryData[keyName];
          const calculatedIncrement: CalculatedIncrement = {
            comparedToAverage:
              averageDataForEntity !== 0
                ? +(entityLoss.increment / averageDataForEntity).toFixed(1)
                : 0,
            diffWithAverage: entityLoss.increment - averageDataForEntity,
            average: averageDataForEntity,
            summary: summaryDataForEntity,
          };
          const updatedEntityLoss: EntityLossFlat = {
            ...entityLoss,
            calculatedIncrement,
          };
          return [keyName, updatedEntityLoss];
        })
      ) as MoDDayResultData;
      return { ...dayResult, data: updatedData };
    });
    const updatedDataWithCalculations: MoDDataSliceWithCalculated = {
      data: updatedMoDData,
      averageData,
      summaryData,
    };
    return updatedDataWithCalculations;
  });
};
