import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MoDDataFlat } from '../../../../_models/data/mod/mod-model';
import { DateRangeWithCount } from '../../../../_models/range';
import { MoDEntityNamesEnum } from '../../../../_models/data/mod/mod-entities';
import {
  DateDataChartComponent,
  DateDataItem,
} from '../../../../components/charts/date-data-chart/date-data-chart.component';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';

@Component({
  selector: 'app-ministry-of-defense-data-plot-chart',
  standalone: true,
  imports: [CommonModule, DateDataChartComponent],
  providers: [TranslatePipe],
  templateUrl: './ministry-of-defense-data-plot-chart.component.html',
  styleUrl: './ministry-of-defense-data-plot-chart.component.scss',
})
export class MinistryOfDefenseDataPlotChartComponent implements OnChanges {
  public daysData: Array<DateDataItem> = [];

  public chartTitle: string = '';

  @Input()
  public data!: MoDDataFlat;

  @Input()
  public datesRange!: DateRangeWithCount;

  public color = '#ff000099';

  private _typeOfLoss!: string;

  public get typeOfLoss(): string {
    return this._typeOfLoss;
  }

  @Input()
  public set typeOfLoss(value: string) {
    this._typeOfLoss = value;
    this.chartTitle = this._translatePipe.transform(
      'chart_' + this._typeOfLoss
    );
  }

  constructor(private _translatePipe: TranslatePipe) {}

  private _mapData(): Array<DateDataItem> {
    return this.data.map((entry) => ({
      date: entry.date,
      value: entry.data[this.typeOfLoss as MoDEntityNamesEnum].increment,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.daysData = this._mapData();
  }
}
