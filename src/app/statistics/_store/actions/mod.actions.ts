import { createAction, props } from '@ngrx/store';
import { MoDActionTypes } from './mod.action-types';
import { MoDDataFlat } from '../../_models/data/mod/mod-model';

export const loadMoDDataAction = createAction(MoDActionTypes.loadMoDData);

export const loadMoDDataActionSuccess = createAction(
  MoDActionTypes.loadMoDDataSuccess,
  props<{ data: MoDDataFlat }>()
);

export const loadMoDDataActionFailure = createAction(
  MoDActionTypes.loadMoDDataFailure
);
