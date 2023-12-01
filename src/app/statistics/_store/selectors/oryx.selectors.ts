import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OryxState } from '../_models/oryx.state';
import { OryxSideNames } from '../../_models/data/oryx/oryx.types';

export const selectOryxState = createFeatureSelector<OryxState>('oryx');

export const selectOryxDataLoaded = createSelector(
  selectOryxState,
  (state) => state.dataLoaded
);

export const selectOryxSideLosses = (side: OryxSideNames) => {
  return createSelector(selectOryxState, (state) => {
    return state.sideLosses[side];
  });
};
