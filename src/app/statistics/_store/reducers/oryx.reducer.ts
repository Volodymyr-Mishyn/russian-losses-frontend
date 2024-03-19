import { createReducer, on } from '@ngrx/store';
import { OryxSideNames } from '../../_models/data/oryx/oryx.types';
import { OryxState } from '../_models/oryx.state';
import {
  loadAllOryxDataAction,
  loadOryxDataActionFailure,
  loadOryxDataActionSuccess,
  loadOryxDataForSideAction,
  loadOryxDataForSideSuccess,
} from '../actions/oryx.actions';

export const initialOryxState: OryxState = {
  dataLoaded: false,
  loadingInProgress: false,
  sideLosses: {
    [OryxSideNames.RUSSIA]: null,
    [OryxSideNames.UKRAINE]: null,
  },
};

export const oryxReducer = createReducer(
  initialOryxState,
  on(loadAllOryxDataAction, (state): OryxState => {
    return {
      ...state,
      dataLoaded: false,
      loadingInProgress: true,
      sideLosses: {
        [OryxSideNames.RUSSIA]: null,
        [OryxSideNames.UKRAINE]: null,
      },
    };
  }),
  on(loadOryxDataActionSuccess, (state, { data }): OryxState => {
    return {
      ...state,
      dataLoaded: true,
      loadingInProgress: false,
      sideLosses: data,
    };
  }),
  on(loadOryxDataForSideAction, (state, { side }): OryxState => {
    return {
      ...state,
      loadingInProgress: true,
      sideLosses: {
        ...state.sideLosses,
        [side]: null,
      },
    };
  }),
  on(loadOryxDataForSideSuccess, (state, { side, data }): OryxState => {
    return {
      ...state,
      loadingInProgress: true,
      sideLosses: {
        ...state.sideLosses,
        [side]: data,
      },
    };
  }),
  on(loadOryxDataActionFailure, (state) => ({
    ...state,
    dataLoaded: false,
    loadingInProgress: false,
  }))
);
