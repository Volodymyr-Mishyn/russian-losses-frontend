import {
  MoDDataFlat,
  MoDDataSliceWithCalculated,
  MoDRankings,
} from '../../../_models/data/mod/mod-model';
import { calculateAverage, calculateSummary } from './mod-aggregation';
import { calculateMoDDaysData } from './mod-days-calculation';
import { getTopMoDForPeriods } from './mod-rankings';

export function calculateMoDSliceData(
  modResult: MoDDataFlat
): MoDDataSliceWithCalculated {
  const averageData = calculateAverage(modResult);
  const summaryData = calculateSummary(modResult);
  const updatedMoDData = calculateMoDDaysData(
    modResult,
    averageData,
    summaryData
  );
  const updatedDataWithCalculations: MoDDataSliceWithCalculated = {
    data: updatedMoDData,
    averageData,
    summaryData,
  };
  return updatedDataWithCalculations;
}

export { calculateAverage, calculateSummary };
