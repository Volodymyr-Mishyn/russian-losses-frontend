export interface OryxStatistics {
  count: number;
  destroyed: number;
  damaged: number;
  captured: number;
  abandoned: number;
}

export interface OryxEntityStatusInfo {
  count: number;
  list: Array<string>;
}

export interface OryxEntityInfo {
  title?: string;
  description?: Array<string>;
  images?: Array<string>;
  url?: string;
}

export interface OryxEntityModel {
  //t-90
  name: string;
  code: string;
  count: number;
  info?: OryxEntityInfo;
  countryName: string;
  entityType: string;
  destroyed: OryxEntityStatusInfo;
  damaged: OryxEntityStatusInfo;
  captured: OryxEntityStatusInfo;
  abandoned: OryxEntityStatusInfo;
  damagedAndCaptured: OryxEntityStatusInfo;
  damagedAndAbandoned: OryxEntityStatusInfo;
}

export interface OryxEntityType {
  //tanks
  name: string;
  code: string;
  countryName: string;
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
