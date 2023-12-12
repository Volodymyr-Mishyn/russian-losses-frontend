import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  OryxEntitiesComparison,
  OryxSideEntitiesLosses,
} from '../../../../_models/data/oryx/oryx-comparison';
import { MatTableModule } from '@angular/material/table';
import { MultipleDatasetsDataChartComponent } from '../../../../components/charts/multiple-datasets-data-chart/multiple-datasets-data-chart.component';
import { ChartData } from '../../../../components/charts/_models/chart-data';
import { OryxSideNames } from '../../../../_models/data/oryx/oryx.types';

@Component({
  selector: 'app-oryx-compare-type-entities',
  standalone: true,
  imports: [CommonModule, MatTableModule, MultipleDatasetsDataChartComponent],
  templateUrl: './oryx-compare-type-entities.component.html',
  styleUrl: './oryx-compare-type-entities.component.scss',
})
export class OryxCompareTypeEntitiesComponent {
  private _entitiesComparison!: OryxEntitiesComparison;

  public tableData: Array<Record<string, number | string>> = [];
  public displayedColumns: Array<string> = ['name'];

  public chartLabels: Array<string> = [];
  public chartData: Array<{ label: string; data: Array<ChartData> }> = [];

  public customColors = {
    [OryxSideNames.RUSSIA]: 'red',
    [OryxSideNames.UKRAINE]: 'blue',
  };

  @Input()
  public set entitiesComparison(entitiesComparison: OryxEntitiesComparison) {
    this._entitiesComparison = entitiesComparison;
    this._setTableData();
    this._setChartData();
  }

  public get entitiesComparison() {
    return this._entitiesComparison;
  }

  private _setTableData(): void {
    this.displayedColumns = ['name', ...this.entitiesComparison.names];
    this.tableData = this.entitiesComparison.countComparison.map(
      (singleSideData) => ({
        name: singleSideData.name,
        ...singleSideData.values.reduce(
          (acc, entityData) => ({
            ...acc,
            [entityData.name]: entityData.value,
          }),
          {}
        ),
      })
    );
  }

  private _setChartData(): void {
    this.chartLabels = this.entitiesComparison.names;
    this.chartData = this.entitiesComparison.countComparison.map(
      ({ name, values }) => ({ label: name, data: values })
    );
  }
}