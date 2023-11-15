export interface EntityLossFlat {
  total: number;
  increment: number;
}

export interface MoDDayResultFlat {
  date: string;
  data: {
    [casualtyCode: string]: EntityLossFlat;
  };
}

export type MoDDataFlat = Array<MoDDayResultFlat>;
