export enum OryxActionTypes {
  loadAllOryxData = '[Upon accessing Oryx related route] Fetching data for Oryx (both sides)',
  loadOryxDataSuccess = '[Russian losses API] Fetching data for Oryx (both sides) success',
  loadOryxDataFailure = '[Russian losses API] Fetching data for Oryx (both sides) failure',

  loadOryxDataForSide = '[Upon accessing Oryx related route] Fetching data for Oryx (one side)',
  loadOryxDataForSideSuccess = '[Russian losses API] Fetching data for Oryx (one side) success',
  loadOryxDataForSideFailure = '[Russian losses API] Fetching data for Oryx (one side) failure',
}
