import { createAction, props } from '@ngrx/store';
import { OryxActionTypes } from './oryx.action-types';
import { OryxSide } from '../../_models/data/oryx/oryx.types';
import { OryxSideLosses } from '../../_models/data/oryx/oryx-model';

export const loadOryxDataAction = createAction(OryxActionTypes.loadOryxData);

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
