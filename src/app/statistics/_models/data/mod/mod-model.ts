import { MoDEntityCategories, MoDEntityNamesEnum } from './mod-entities';

export type CalculatedData = {
  [key in MoDEntityNamesEnum]: number;
};

export interface CalculatedDataElement {
  entityType: MoDEntityNamesEnum;
  entityCategory?: MoDEntityCategories;
  value: number;
}

export interface CalculatedIncrement {
  comparedToAverage: number;
  diffWithAverage: number;
  average: number;
  summary: number;
}

export interface EntityLossFlat {
  name: string;
  total: number;
  increment: number;
  calculatedIncrement?: CalculatedIncrement;
}

export type MoDDayResultData = {
  [key in MoDEntityNamesEnum]: EntityLossFlat;
};

export interface MoDDayResultFlat {
  date: string;
  dayOfInvasion: number;
  data: MoDDayResultData;
}

export type MoDDataFlat = Array<MoDDayResultFlat>;

export interface MoDRankingsPlace {
  place: number;
  daysInPeriod: number;
  dates: {
    start: string;
    end: string;
  };
  daysOfInvasion: {
    start: number;
    end: number;
  };
  increment: number;
}

export interface MoDRankings {
  entityName: MoDEntityNamesEnum;
  places: Array<MoDRankingsPlace>;
}

export interface MoDDataSliceWithCalculated {
  data: MoDDataFlat;
  averageData: CalculatedData;
  summaryData: CalculatedData;
  rankings?: Array<MoDRankings>;
}
