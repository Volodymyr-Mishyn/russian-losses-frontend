import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  OryxEntityType,
  OryxStatistics,
} from '../../../../_models/data/oryx/oryx-model';
import { OryxStatisticsComponent } from '../oryx-statistics/oryx-statistics.component';
import { OryxEntityLossesComponent } from '../oryx-entity-losses/oryx-entity-losses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  PieChartComponent,
  PieChartData,
} from '../../../../components/charts/pie-chart/pie-chart.component';
@Component({
  selector: 'app-oryx-type-losses',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    OryxStatisticsComponent,
    OryxEntityLossesComponent,
    PieChartComponent,
  ],
  templateUrl: './oryx-type-losses.component.html',
  styleUrl: './oryx-type-losses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxTypeLossesComponent {
  public chartData: Array<PieChartData> = [];

  @Input()
  private _entityType!: OryxEntityType;

  @Input()
  public set entityType(entityType: OryxEntityType) {
    this._entityType = entityType;
    const statisticsData = {
      ...this._entityType.statistics,
    } as Partial<OryxStatistics>;
    delete statisticsData.count;
    this.chartData = Object.entries(statisticsData).map(([key, value]) => ({
      name: key,
      value,
    }));
  }

  public get entityType() {
    return this._entityType;
  }
}
