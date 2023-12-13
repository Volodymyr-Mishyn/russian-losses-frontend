import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OryxState } from '../_models/oryx.state';
import { OryxSideNames } from '../../_models/data/oryx/oryx.types';
import { OryxEntityType } from '../../_models/data/oryx/oryx-model';
import { createOryxComparison } from '../_helpers/oryx-calculation.utils';

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

export const selectOryxComparison = createSelector(selectOryxState, (state) => {
  const entityTypes = Object.values(state.sideLosses)
    .map((sideLosses) => sideLosses?.entityTypes)
    .filter((value) => !!value) as Array<Array<OryxEntityType>>;
  return createOryxComparison(entityTypes);
});
