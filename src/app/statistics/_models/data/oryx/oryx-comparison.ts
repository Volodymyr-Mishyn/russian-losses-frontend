import { OryxSideNames } from './oryx.types';

export interface OryxEntitiesComparison {
  names: Array<string>;
  countComparison: Array<{
    name: OryxSideNames;
    values: Array<{ name: string; value: number }>;
  }>;
}

export interface OryxEntityTypeComparison {
  name: string;
  countComparison: Array<{ name: OryxSideNames; value: number }>;
  entitiesComparison: OryxEntitiesComparison;
}

export type OryxComparison = Array<OryxEntityTypeComparison>;
