import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  OryxEntityStatusInfo,
  OryxEntityModel,
} from '../../../../_models/data/oryx/oryx-model';
import { OryxEntityLossDetailDialogComponent } from './oryx-entity-loss-detail-dialog/oryx-entity-loss-detail-dialog.component';
import { PieChartComponent } from '../../../../components/charts/pie-chart/pie-chart.component';
import { ChartData } from '../../../../components/charts/_models/chart-data';
import { sortOryxData } from '../../../../_helpers/oryx.sort';
import { OryxEntityInfoComponent } from '../../../components/oryx-entity-info/oryx-entity-info.component';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    PieChartComponent,
    OryxEntityInfoComponent,
    TranslatePipe,
  ],
  providers: [TranslatePipe],
  templateUrl: './oryx-entity-losses-details.component.html',
  styleUrl: './oryx-entity-losses-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxEntityLossesDetailsComponent {
  public statistics: Array<DetailedEntityStatistics> = [];
  public chartData: Array<ChartData> = [];
  private _entityModel!: OryxEntityModel;
  @Input()
  public set entityModel(entityModel: OryxEntityModel) {
    this._entityModel = entityModel;
    this._setStatisticsData();
    this._setStatisticsChartData();
  }

  public get entityModel(): OryxEntityModel {
    return this._entityModel;
  }

  constructor(
    private _dialog: MatDialog,
    private _translatePipe: TranslatePipe
  ) {}

  private _setStatisticsData(): void {
    const statistics: Array<DetailedEntityStatistics> = [];
    Object.keys(this.entityModel).forEach((key) => {
      if (FIELDS_TO_DISPLAY_SET.has(key) && key in this.entityModel) {
        const entityStatusInfo = this.entityModel[
          key as keyof OryxEntityModel
        ] as OryxEntityStatusInfo;
        statistics.push({
          key,
          name: this._translatePipe.transform('oryx_entity_' + key),
          count: entityStatusInfo.count,
        });
      }
    });
    this.statistics = statistics;
  }

  private _setStatisticsChartData(): void {
    const chartData = this.statistics.map((element) => ({
      name: element.name,
      value: element.count,
    }));
    this.chartData = sortOryxData(chartData, 'name');
  }

  public openInfo(statisticsFor: DetailedEntityStatistics): void {
    if (statisticsFor.count === 0) {
      return;
    }
    this._dialog.open(OryxEntityLossDetailDialogComponent, {
      data: {
        entityModel: this._entityModel,
        detailKey: statisticsFor.key,
      },
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'custom-large-dialog',
      autoFocus: false,
    });
  }
}
