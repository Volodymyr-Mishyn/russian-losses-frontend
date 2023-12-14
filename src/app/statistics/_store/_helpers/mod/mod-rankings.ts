import { MoDEntityNamesEnum } from '../../../_models/data/mod/mod-entities';
import {
  MoDDataFlat,
  MoDRankingFormat,
  MoDRankings,
} from '../../../_models/data/mod/mod-model';

type MoDEntityIncrement = {
  entityName: MoDEntityNamesEnum;
  increment: number;
  date: string;
  dayOfInvasion: number;
};

function getWeekPeriod(dateString: string): string {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return `${startOfWeek.getFullYear()}-${
    startOfWeek.getMonth() + 1
  }-${startOfWeek.getDate()}-${endOfWeek.getFullYear()}-${
    endOfWeek.getMonth() + 1
  }-${endOfWeek.getDate()}`;
}

function getDateForPeriod(
  dateString: string,
  periodType: 'days' | 'weeks' | 'months'
): string {
  const date = new Date(dateString);
  if (periodType === 'weeks') {
    return getWeekPeriod(dateString);
  } else if (periodType === 'months') {
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
  return dateString;
}

function groupEntityDataByPeriod(
  entityData: Array<MoDEntityIncrement>,
  periodType: 'days' | 'weeks' | 'months'
) {
  const groupedData: { [key: string]: Array<MoDEntityIncrement> } = {};
  entityData.forEach((data) => {
    const dateForPeriod = getDateForPeriod(data.date, periodType);
    if (!groupedData[dateForPeriod]) {
      groupedData[dateForPeriod] = [];
    }
    groupedData[dateForPeriod].push(data);
  });
  return groupedData;
}

function calculateTotalIncrement(daysInfoList: Array<MoDEntityIncrement>) {
  return daysInfoList.reduce((sum, data) => sum + data.increment, 0);
}

function getTopPeriodsForEntity(
  entityData: Array<MoDEntityIncrement>,
  numberOfPlaces: number,
  periodType: MoDRankingFormat
) {
  const groupedData = groupEntityDataByPeriod(entityData, periodType);

  const periodTotalIncrement = Object.keys(groupedData).map((periodKey) => {
    const daysInfoList = [...groupedData[periodKey]];
    daysInfoList.sort(
      (dayOne, dayTwo) => dayOne.dayOfInvasion - dayTwo.dayOfInvasion
    );
    const totalIncrement = calculateTotalIncrement(daysInfoList);
    const daysInPeriod = daysInfoList.length;
    const firstDay = daysInfoList[0];
    const lastDay = daysInfoList[daysInfoList.length - 1];
    return {
      increment: totalIncrement,
      daysInPeriod,
      dates: {
        start: firstDay.date,
        end: lastDay.date,
      },
      daysOfInvasion: {
        start: firstDay.dayOfInvasion,
        end: lastDay.dayOfInvasion,
      },
    };
  });

  periodTotalIncrement.sort((a, b) => b.increment - a.increment);
  return periodTotalIncrement.slice(0, numberOfPlaces);
}

export function getTopMoDForPeriods(
  data: MoDDataFlat,
  numberOfPlaces: number,
  periodType: MoDRankingFormat
): Array<MoDRankings> {
  const rankings: Array<MoDRankings> = [];

  Object.values(MoDEntityNamesEnum).forEach((entityName) => {
    const entityData: Array<MoDEntityIncrement> = [];

    data.forEach((dayResult) => {
      const entityLossFlat = dayResult.data[entityName as MoDEntityNamesEnum];
      if (entityLossFlat) {
        const { increment } = entityLossFlat;
        entityData.push({
          entityName: entityLossFlat.name as MoDEntityNamesEnum,
          increment,
          date: dayResult.date,
          dayOfInvasion: dayResult.dayOfInvasion,
        });
      }
    });

    const topNPeriods = getTopPeriodsForEntity(
      entityData,
      numberOfPlaces,
      periodType
    );

    const moDRankings: MoDRankings = {
      entityName: entityName as MoDEntityNamesEnum,
      places: topNPeriods.map((data, index) => ({
        place: index,
        daysInPeriod: data.daysInPeriod,
        dates: data.dates,
        daysOfInvasion: data.daysOfInvasion,
        increment: data.increment,
        format: periodType,
      })),
    };

    rankings.push(moDRankings);
  });

  return rankings;
}
