import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  EntityStatusInfo,
  OryxEntityModel,
} from '../../../../_models/data/oryx/oryx-model';
import { OryxEntityLossDetailDialogComponent } from './oryx-entity-loss-detail-dialog/oryx-entity-loss-detail-dialog.component';

const FIELDS_TO_DISPLAY = [
  'destroyed',
  'damaged',
  'abandoned',
  'captured',
  'damagedAndAbandoned',
  'damagedAndCaptured',
];
const FIELDS_TO_DISPLAY_SET = new Set(FIELDS_TO_DISPLAY);
interface DetailedEntityStatistics {
  key: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-oryx-entity-losses-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oryx-entity-losses-details.component.html',
  styleUrl: './oryx-entity-losses-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxEntityLossesDetailsComponent {
  public statistics: Array<DetailedEntityStatistics> = [];
  private _entityModel!: OryxEntityModel;
  @Input()
  public set entityModel(entityModel: OryxEntityModel) {
    this._entityModel = entityModel;
    const statistics: Array<DetailedEntityStatistics> = [];
    Object.keys(entityModel).forEach((key) => {
      if (FIELDS_TO_DISPLAY_SET.has(key) && key in entityModel) {
        const entityStatusInfo = entityModel[
          key as keyof OryxEntityModel
        ] as EntityStatusInfo;
        statistics.push({
          key,
          name: key,
          count: entityStatusInfo.count,
        });
      }
    });
    this.statistics = statistics;
  }

  constructor(private _dialog: MatDialog) {}

  public openInfo(statisticsFor: DetailedEntityStatistics): void {
    if (statisticsFor.count === 0) {
      return;
    }
    this._dialog.open(OryxEntityLossDetailDialogComponent, {
      data: {
        entityModel: this._entityModel,
        detailKey: statisticsFor.key,
      },
    });
  }
}
