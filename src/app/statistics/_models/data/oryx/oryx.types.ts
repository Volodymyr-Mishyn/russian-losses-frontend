export enum OryxSideNames {
  RUSSIA = 'RUSSIA',
  UKRAINE = 'UKRAINE',
}

export type OryxSide = OryxSideNames.RUSSIA | OryxSideNames.UKRAINE;

export const ORYX_STATISTICS_ORDER: Record<string, number> = {
  destroyed: 0,
  damaged: 1,
  captured: 2,
  abandoned: 3,
  damagedAndCaptured: 4,
  damagedAndAbandoned: 5,
};
