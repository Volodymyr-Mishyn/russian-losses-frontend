import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MoDDataSliceWithCalculated } from '../../../_models/data/mod/mod-model';
import { MinistryOfDefenseTablesComponent } from '../tables/ministry-of-defense-tables/ministry-of-defense-tables.component';
import { DateRangeWithCount } from '../../../_models/range';
import { MatTabsModule } from '@angular/material/tabs';
import { MinistryOfDefenseChartsComponent } from '../charts/ministry-of-defense-charts/ministry-of-defense-charts.component';
import { PlatformService } from '../../../../services/platform.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ministry-of-defense-statistics-presenter',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MinistryOfDefenseTablesComponent,
    MinistryOfDefenseChartsComponent,
    MatIconModule,
  ],
  templateUrl: './ministry-of-defense-statistics-presenter.component.html',
  styleUrl: './ministry-of-defense-statistics-presenter.component.scss',
})
export class MinistryOfDefenseStatisticsPresenterComponent {
  @Input()
  public data!: MoDDataSliceWithCalculated;

  @Input()
  public datesRange!: DateRangeWithCount;

  constructor(public platformService: PlatformService) {}
}
