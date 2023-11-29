import { OryxSideLosses } from '../../_models/data/oryx/oryx-model';
import { OryxSide } from '../../_models/data/oryx/oryx.types';

export interface OryxState {
  loadingInProgress: boolean;
  dataLoaded: boolean;
  sideLosses: {
    [k in OryxSide]: OryxSideLosses | null;
  };
}
