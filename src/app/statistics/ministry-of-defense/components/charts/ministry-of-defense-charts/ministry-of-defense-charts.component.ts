import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MoDDataFlat,
  MoDDataSliceWithCalculated,
} from '../../../../_models/data/mod/mod-model';
import { DateRangeWithCount } from '../../../../_models/range';
import { MinistryOfDefenseDataPlotChartComponent } from '../ministry-of-defense-data-plot-chart/ministry-of-defense-data-plot-chart.component';
import { ALL_MOD_ENTITIES } from '../../../../_models/data/mod/mod-entities';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ministry-of-defense-charts',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MinistryOfDefenseDataPlotChartComponent,
  ],
  templateUrl: './ministry-of-defense-charts.component.html',
  styleUrl: './ministry-of-defense-charts.component.scss',
})
export class MinistryOfDefenseChartsComponent {
  public daysData!: MoDDataFlat;
  @Input()
  public set data({ data }: MoDDataSliceWithCalculated) {
    this.daysData = [...data];
  }

  @Input()
  public datesRange!: DateRangeWithCount;

  public entitiesNames = ALL_MOD_ENTITIES;
}
