import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  EntityStatusInfo,
  OryxEntityModel,
} from '../../../../_models/data/oryx/oryx-model';

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
  @Input()
  public set entityModel(entityModel: OryxEntityModel) {
    const statistics: Array<DetailedEntityStatistics> = [];
    Object.keys(entityModel).forEach((key) => {
      if (FIELDS_TO_DISPLAY_SET.has(key) && key in entityModel) {
        const entityStatusInfo = entityModel[
          key as keyof OryxEntityModel
        ] as EntityStatusInfo;
        statistics.push({
          name: key,
          count: entityStatusInfo.count,
        });
      }
    });
    this.statistics = statistics;
  }
}
