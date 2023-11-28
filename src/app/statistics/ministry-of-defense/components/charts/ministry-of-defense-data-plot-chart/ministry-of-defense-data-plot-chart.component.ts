import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MoDDataFlat } from '../../../../_models/data/mod/mod-model';
import { DateRangeWithCount } from '../../../../_models/range';
import { EntityNamesEnum } from '../../../../_models/data/mod/mod-entities';
import {
  DateDataChartComponent,
  DateDataItem,
} from '../../../../components/charts/date-data-chart/date-data-chart.component';

@Component({
  selector: 'app-ministry-of-defense-data-plot-chart',
  standalone: true,
  imports: [CommonModule, DateDataChartComponent],
  templateUrl: './ministry-of-defense-data-plot-chart.component.html',
  styleUrl: './ministry-of-defense-data-plot-chart.component.scss',
})
export class MinistryOfDefenseDataPlotChartComponent implements OnChanges {
  public daysData: Array<DateDataItem> = [];

  @Input()
  public data!: MoDDataFlat;

  @Input()
  public datesRange!: DateRangeWithCount;

  @Input()
  public typeOfLoss!: string;

  private _mapData(): Array<DateDataItem> {
    return this.data.map((entry) => ({
      date: entry.date,
      value: entry.data[this.typeOfLoss as EntityNamesEnum].increment,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.daysData = this._mapData();
  }
}
