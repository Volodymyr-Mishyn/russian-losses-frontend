import { createFeature } from '@ngrx/store';
import { modReducer } from '../reducers/mod.reducer';

export const modStoreFeature = createFeature({
  name: 'mod',
  reducer: modReducer,
});
