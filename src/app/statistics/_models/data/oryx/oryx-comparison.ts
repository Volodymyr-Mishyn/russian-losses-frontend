import { OryxSideNames } from './oryx.types';

export interface OryxSideEntitiesLosses {
  name: OryxSideNames;
  values: Array<{ name: string; value: number }>;
}

export interface OryxEntitiesComparison {
  names: Array<string>;
  countComparison: Array<OryxSideEntitiesLosses>;
}

export interface OryxEntityTypeComparison {
  name: string;
  countComparison: Array<{ name: OryxSideNames; value: number }>;
  entitiesComparison: OryxEntitiesComparison;
}

export type OryxComparison = Array<OryxEntityTypeComparison>;
