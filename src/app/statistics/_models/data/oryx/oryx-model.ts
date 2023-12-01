export interface OryxStatistics {
  count: number;
  destroyed: number;
  damaged: number;
  abandoned: number;
  captured: number;
}

export interface EntityStatusInfo {
  count: number;
  list: Array<string>;
}

export interface OryxEntityModel {
  //t-90
  name: string;
  code: string;
  count: number;
  description?: string;
  image?: string;
  countryName: string;
  entityType: string;
  destroyed: EntityStatusInfo;
  damaged: EntityStatusInfo;
  captured: EntityStatusInfo;
  abandoned: EntityStatusInfo;
  damagedAndCaptured: EntityStatusInfo;
  damagedAndAbandoned: EntityStatusInfo;
}

export interface OryxEntityType {
  //tanks
  name: string;
  code: string;
  countryName: string;
  description?: string;
  image?: string;
  statistics: OryxStatistics;
  entities: Array<OryxEntityModel>;
}

export interface OryxSideLosses {
  //russia
  name: string;
  countryName: string;
  date: string;
  updatedAt?: string;
  image?: string;
  statistics: OryxStatistics;
  entityTypes: Array<OryxEntityType>;
}
