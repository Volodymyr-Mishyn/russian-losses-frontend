import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxSideTypeLossesCountComparison } from '../../../../_models/data/oryx/oryx-comparison';
import { PieChartComponent } from '../../../../components/charts/pie-chart/pie-chart.component';
import { OryxSideNames } from '../../../../_models/data/oryx/oryx.types';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-oryx-compare-type-overall-counts',
  standalone: true,
  imports: [CommonModule, PieChartComponent, MatTableModule],
  templateUrl: './oryx-compare-type-overall-counts.component.html',
  styleUrl: './oryx-compare-type-overall-counts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxCompareTypeOverallCountsComponent {
  public displayedColumns: string[] = ['name', 'value'];

  @Input()
  public countData!: OryxSideTypeLossesCountComparison;

  public customColors = {
    [OryxSideNames.RUSSIA]: 'red',
    [OryxSideNames.UKRAINE]: 'blue',
  };
}
