import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  OryxEntityType,
  OryxStatistics,
} from '../../../../_models/data/oryx/oryx-model';
import { OryxStatisticsComponent } from '../oryx-statistics/oryx-statistics.component';
import { OryxEntityLossesComponent } from '../oryx-entity-losses/oryx-entity-losses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PieChartComponent } from '../../../../components/charts/pie-chart/pie-chart.component';
import { ChartData } from '../../../../components/charts/_models/chart-data';
import { NumberDataChartComponent } from '../../../../components/charts/number-data-chart/number-data-chart.component';
import { ORYX_STATISTICS_ORDER } from '../../../../_models/data/oryx/oryx.types';
import { sortOryxData } from '../../../../_helpers/oryx.sort';
@Component({
  selector: 'app-oryx-type-losses',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    OryxStatisticsComponent,
    OryxEntityLossesComponent,
    PieChartComponent,
    NumberDataChartComponent,
  ],
  templateUrl: './oryx-type-losses.component.html',
  styleUrl: './oryx-type-losses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxTypeLossesComponent {
  public statisticsChartData: Array<ChartData> = [];
  public entitiesChartData: Array<ChartData> = [];

  @Input()
  private _entityType!: OryxEntityType;

  @Input()
  public set entityType(entityType: OryxEntityType) {
    this._entityType = entityType;
    this._setChartsData();
  }

  public get entityType() {
    return this._entityType;
  }

  private _sortData(data: Array<ChartData>): Array<ChartData> {
    return sortOryxData(data, 'name');
  }

  private _setStatisticsChartData(): void {
    const statisticsData = {
      ...this._entityType.statistics,
    } as Partial<OryxStatistics>;
    delete statisticsData.count;
    const statisticsChartData = Object.entries(statisticsData).map(
      ([key, value]) => ({
        name: key,
        value,
      })
    );
    this.statisticsChartData = this._sortData(statisticsChartData);
  }

  private _setEntitiesChartData(): void {
    const entitiesChartData = this.entityType.entities.map(
      ({ name, count }) => ({ name, value: count })
    );
    this.entitiesChartData = this._sortData(entitiesChartData);
  }

  private _setChartsData(): void {
    this._setStatisticsChartData();
    this._setEntitiesChartData();
  }
}