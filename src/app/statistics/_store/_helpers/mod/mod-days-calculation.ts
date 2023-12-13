import { MoDEntityNamesEnum } from '../../../_models/data/mod/mod-entities';
import {
  CalculatedData,
  CalculatedIncrement,
  EntityLossFlat,
  MoDDataFlat,
  MoDDayResultData,
} from '../../../_models/data/mod/mod-model';

export function calculateMoDDaysData(
  inputData: MoDDataFlat,
  averageData: CalculatedData,
  summaryData: CalculatedData
): MoDDataFlat {
  return inputData.map((dayResult) => {
    const { data } = dayResult;
    const updatedData: MoDDayResultData = Object.fromEntries(
      Object.entries(data).map(([key, entityLoss]) => {
        const keyName = key as MoDEntityNamesEnum;
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
}
