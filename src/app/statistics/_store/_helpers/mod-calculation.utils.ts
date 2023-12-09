import { EntityNamesEnum } from '../../_models/data/mod/mod-entities';
import {
  CalculatedData,
  CalculatedIncrement,
  EntityLossFlat,
  MoDDataFlat,
  MoDDataSliceWithCalculated,
  MoDDayResultData,
  MoDDayResultFlat,
} from '../../_models/data/mod/mod-model';

export function calculateSummary(modData: MoDDataFlat): CalculatedData {
  const averageData: CalculatedData = {
    tank: 0,
    armored_fighting_vehicle: 0,
    artillery_system: 0,
    mlrs: 0,
    anti_aircraft: 0,
    plane: 0,
    helicopter: 0,
    uav: 0,
    cruise_missile: 0,
    ship: 0,
    submarine: 0,
    car_cistern: 0,
    special_equipment: 0,
    personnel: 0,
  };
  return modData.reduce((accumulator, dayData) => {
    Object.entries(dayData.data).forEach(([key, value]) => {
      const typeName = key as unknown as EntityNamesEnum;
      accumulator[typeName] = (accumulator[typeName] || 0) + value.increment;
    });
    return accumulator;
  }, averageData);
}

export function calculateAverage(modData: MoDDataFlat): CalculatedData {
  const calculatedSummary = calculateSummary(modData);
  return Object.keys(calculatedSummary).reduce((accumulated, type) => {
    const typeName = type as EntityNamesEnum;
    accumulated[typeName] = +(
      calculatedSummary[typeName] / modData.length
    ).toFixed(1);
    return accumulated;
  }, {} as CalculatedData);
}

export function calculateMoDSliceData(
  modResult: Array<MoDDayResultFlat>
): MoDDataSliceWithCalculated {
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
}
