import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  CalculatedData,
  FullMoDRankings,
  MoDDataFlat,
  MoDDataSliceWithCalculated,
} from '../../../../_models/data/mod/mod-model';
import { MinistryOfDefenseDaysTableComponent } from '../ministry-of-defense-days-table/ministry-of-defense-days-table.component';
import { MinistryOfDefenseCalculatedTableComponent } from '../ministry-of-defense-calculated-table/ministry-of-defense-calculated-table.component';
import { DateRangeWithCount } from '../../../../_models/range';
import { MinistryOfDefenseRankingsTablesComponent } from '../ministry-of-defense-rankings-tables/ministry-of-defense-rankings-tables.component';

@Component({
  selector: 'app-ministry-of-defense-tables',
  standalone: true,
  imports: [
    CommonModule,
    MinistryOfDefenseDaysTableComponent,
    MinistryOfDefenseCalculatedTableComponent,
    MinistryOfDefenseRankingsTablesComponent,
  ],
  templateUrl: './ministry-of-defense-tables.component.html',
  styleUrl: './ministry-of-defense-tables.component.scss',
})
export class MinistryOfDefenseTablesComponent {
  public daysData: MoDDataFlat = [];
  public averageData!: CalculatedData;
  public summaryData!: CalculatedData;
  public rankings!: FullMoDRankings;
  @Input()
  public set data({
    data,
    averageData,
    summaryData,
    rankings,
  }: MoDDataSliceWithCalculated) {
    this.daysData = data;
    this.averageData = averageData;
    this.summaryData = summaryData;
    this.rankings = rankings;
  }

  @Input()
  public datesRange!: DateRangeWithCount;
}
