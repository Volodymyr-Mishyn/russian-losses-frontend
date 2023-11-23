import { EntityCategories, EntityNamesEnum } from './mod-entities';

export type CalculatedData = {
  [key in EntityNamesEnum]: number;
};

export interface CalculatedDataElement {
  entityType: EntityNamesEnum;
  entityCategory?: EntityCategories;
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
  [key in EntityNamesEnum]: EntityLossFlat;
};
export interface MoDDayResultFlat {
  date: string;
  dayOfInvasion: number;
  data: MoDDayResultData;
}

export type MoDDataFlat = Array<MoDDayResultFlat>;

export interface MoDDataSliceWithCalculated {
  data: MoDDataFlat;
  averageData: CalculatedData;
  summaryData: CalculatedData;
}
