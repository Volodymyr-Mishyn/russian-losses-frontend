import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OryxState } from '../_models/oryx.state';

export const selectOryxState = createFeatureSelector<OryxState>('oryx');

export const selectOryxDataLoaded = createSelector(
  selectOryxState,
  (state) => state.dataLoaded
);
