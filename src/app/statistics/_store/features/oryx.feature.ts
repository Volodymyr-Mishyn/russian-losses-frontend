import { createFeature } from '@ngrx/store';
import { oryxReducer } from '../reducers/oryx.reducer';

export const oryxStoreFeature = createFeature({
  name: 'oryx',
  reducer: oryxReducer,
});
