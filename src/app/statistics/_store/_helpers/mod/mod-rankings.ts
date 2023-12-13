import { MoDEntityNamesEnum } from '../../../_models/data/mod/mod-entities';
import { MoDDataFlat, MoDRankings } from '../../../_models/data/mod/mod-model';

type EntityIncrement = {
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
  entityData: Array<EntityIncrement>,
  periodType: 'days' | 'weeks' | 'months'
) {
  const groupedData: { [key: string]: Array<EntityIncrement> } = {};
  entityData.forEach((data) => {
    const dateForPeriod = getDateForPeriod(data.date, periodType);
    if (!groupedData[dateForPeriod]) {
      groupedData[dateForPeriod] = [];
    }
    groupedData[dateForPeriod].push(data);
  });
  return groupedData;
}

function calculateTotalIncrement(daysInfoList: Array<EntityIncrement>) {
  return daysInfoList.reduce((sum, data) => sum + data.increment, 0);
}

function getTopPeriodsForEntity(
  entityData: Array<EntityIncrement>,
  numberOfPlaces: number,
  periodType: 'days' | 'weeks' | 'months'
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
  periodType: 'days' | 'weeks' | 'months'
): Array<MoDRankings> {
  const rankings: Array<MoDRankings> = [];

  Object.values(MoDEntityNamesEnum).forEach((entityName) => {
    const entityData: Array<EntityIncrement> = [];

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
      })),
    };

    rankings.push(moDRankings);
  });

  return rankings;
}

export function getTopMoDForPeriods1(
  data: MoDDataFlat,
  numberOfPlaces: number,
  periodType: 'days' | 'weeks' | 'months'
): Array<MoDRankings> {
  const rankings: Array<MoDRankings> = [];

  Object.values(MoDEntityNamesEnum).forEach((entityName) => {
    const entityData: Array<EntityIncrement> = [];

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

    const groupedData = groupEntityDataByPeriod(entityData, periodType);

    const periodTotalIncrement: Array<{
      daysInPeriod: number;
      increment: number;
      dates: {
        start: string;
        end: string;
      };
      daysOfInvasion: {
        start: number;
        end: number;
      };
    }> = [];
    Object.keys(groupedData).forEach((periodKey) => {
      const daysInfoList = [...groupedData[periodKey]];
      daysInfoList.sort(
        (dayOne, dayTwo) => dayOne.dayOfInvasion - dayTwo.dayOfInvasion
      );
      const totalIncrement = daysInfoList.reduce(
        (sum, data) => sum + data.increment,
        0
      );
      const daysInPeriod = daysInfoList.length;
      const firstDay = daysInfoList[0];
      const lastDay = daysInfoList[daysInfoList.length - 1];
      periodTotalIncrement.push({
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
      });
    });

    periodTotalIncrement.sort((a, b) => b.increment - a.increment);

    const topNPeriods = periodTotalIncrement.slice(0, numberOfPlaces);

    const moDRankings: MoDRankings = {
      entityName: entityName as MoDEntityNamesEnum,
      places: topNPeriods.map((data, index) => ({
        place: index + 1,
        daysInPeriod: data.daysInPeriod,
        dates: data.dates,
        daysOfInvasion: data.daysOfInvasion,
        increment: data.increment,
      })),
    };

    rankings.push(moDRankings);
  });

  return rankings;
}
