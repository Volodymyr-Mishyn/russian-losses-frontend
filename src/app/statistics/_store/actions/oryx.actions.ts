import { createAction, props } from '@ngrx/store';
import { OryxActionTypes } from './oryx.action-types';
import { OryxSide, OryxSideNames } from '../../_models/data/oryx/oryx.types';
import { OryxSideLosses } from '../../_models/data/oryx/oryx-model';

export const loadAllOryxDataAction = createAction(
  OryxActionTypes.loadAllOryxData
);

export const loadOryxDataActionSuccess = createAction(
  OryxActionTypes.loadOryxDataSuccess,
  props<{
    data: {
      [k in OryxSide]: OryxSideLosses;
    };
  }>()
);

export const loadOryxDataActionFailure = createAction(
  OryxActionTypes.loadOryxDataFailure
);

export const loadOryxDataForSideAction = createAction(
  OryxActionTypes.loadOryxDataForSide,
  props<{ side: OryxSide }>()
);

export const loadOryxDataForSideSuccess = createAction(
  OryxActionTypes.loadOryxDataForSideSuccess,
  props<{ side: OryxSideNames; data: OryxSideLosses }>()
);
