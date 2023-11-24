import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MoDDataSliceWithCalculated } from '../../../_models/data/mod/mod-model';
import { MinistryOfDefenseTablesComponent } from '../tables/ministry-of-defense-tables/ministry-of-defense-tables.component';
import { DateRangeWithCount } from '../../../_models/range';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-ministry-of-defense-statistics-presenter',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MinistryOfDefenseTablesComponent],
  templateUrl: './ministry-of-defense-statistics-presenter.component.html',
  styleUrl: './ministry-of-defense-statistics-presenter.component.scss',
})
export class MinistryOfDefenseStatisticsPresenterComponent {
  @Input()
  public data!: MoDDataSliceWithCalculated;

  @Input()
  public datesRange!: DateRangeWithCount;
}
