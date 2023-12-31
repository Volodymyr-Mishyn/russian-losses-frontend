import { OryxSideNames } from './oryx.types';

export interface OryxSideEntitiesLosses {
  name: OryxSideNames | string;
  values: Array<{ name: string; value: number }>;
}

export interface OryxEntitiesComparison {
  names: Array<string>;
  countComparison: Array<OryxSideEntitiesLosses>;
}

export interface OryxSideTypeLossesCount {
  name: OryxSideNames | string;
  value: number;
}

export type OryxSideTypeLossesCountComparison = Array<OryxSideTypeLossesCount>;

export interface OryxEntityTypeComparison {
  name: string;
  countComparison: OryxSideTypeLossesCountComparison;
  entitiesComparison: OryxEntitiesComparison;
}

export type OryxComparison = Array<OryxEntityTypeComparison>;
