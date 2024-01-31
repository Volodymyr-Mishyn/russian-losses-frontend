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
import { sortOryxData } from '../../../../_helpers/oryx.sort';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { OryxSideNames } from '../../../../_models/data/oryx/oryx.types';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-oryx-type-losses',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    OryxStatisticsComponent,
    OryxEntityLossesComponent,
    PieChartComponent,
    NumberDataChartComponent,
    TranslatePipe,
  ],
  providers: [TranslatePipe],
  templateUrl: './oryx-type-losses.component.html',
  styleUrl: './oryx-type-losses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxTypeLossesComponent {
  public statisticsChartData: Array<ChartData> = [];
  public entitiesChartData: Array<ChartData> = [];
  public chartLineColor: string | null = null;
  public entityTypeName!: string;
  public currentCountryName!: string;

  @Input()
  private _entityType!: OryxEntityType;

  @Input()
  public set entityType(entityType: OryxEntityType) {
    this._entityType = entityType;
    this.entityTypeName = this._translatePipe.transform(
      'oryx_type_' + entityType.code
    );
    switch (entityType.countryName) {
      case OryxSideNames.RUSSIA:
        this.chartLineColor = 'red';
        this.currentCountryName = 'russia';
        break;
      case OryxSideNames.UKRAINE:
        this.chartLineColor = 'blue';
        this.currentCountryName = 'Ukraine';
        break;
      default:
        this.chartLineColor = null;
    }
    this._setChartsData();
  }

  public get entityType() {
    return this._entityType;
  }

  constructor(private _translatePipe: TranslatePipe) {}

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
    const sortedStatisticsChartData = this._sortData(statisticsChartData);
    const translatedStatisticsChartData = sortedStatisticsChartData.map(
      ({ name, value }) => ({
        name: this._translatePipe.transform('oryx_entity_' + name),
        value,
      })
    );
    this.statisticsChartData = translatedStatisticsChartData;
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
