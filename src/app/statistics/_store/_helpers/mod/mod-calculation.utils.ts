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
  const monthlyRanking: Array<MoDRankings> = getTopMoDForPeriods(
    updatedMoDData,
    3,
    'months'
  );

  const weeklyRanking: Array<MoDRankings> = getTopMoDForPeriods(
    updatedMoDData,
    3,
    'weeks'
  );

  const dailyRanking: Array<MoDRankings> = getTopMoDForPeriods(
    updatedMoDData,
    3,
    'days'
  );
  const updatedDataWithCalculations: MoDDataSliceWithCalculated = {
    data: updatedMoDData,
    averageData,
    summaryData,
    rankings: {
      daily: dailyRanking,
      weekly: weeklyRanking,
      monthly: monthlyRanking,
    },
  };
  return updatedDataWithCalculations;
}

export { calculateAverage, calculateSummary };
