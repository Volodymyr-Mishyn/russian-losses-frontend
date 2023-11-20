import { EntityState } from '@ngrx/entity';
import {
  CalculatedData,
  MoDDayResultFlat,
} from '../../_models/data/mod/mod-model';

export interface MoDEntityState extends EntityState<MoDDayResultFlat> {
  loadingInProgress: boolean;
  dataLoaded: boolean;
  averageData: CalculatedData | null;
  summaryData: CalculatedData | null;
}
