import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxSideTypeLossesCountComparison } from '../../../../_models/data/oryx/oryx-comparison';
import { PieChartComponent } from '../../../../components/charts/pie-chart/pie-chart.component';
import { OryxSideNames } from '../../../../_models/data/oryx/oryx.types';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';

@Component({
  selector: 'app-oryx-compare-type-overall-counts',
  standalone: true,
  imports: [CommonModule, PieChartComponent, MatTableModule, TranslatePipe],
  providers: [TranslatePipe],
  templateUrl: './oryx-compare-type-overall-counts.component.html',
  styleUrl: './oryx-compare-type-overall-counts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxCompareTypeOverallCountsComponent {
  public displayedColumns: string[] = ['name', 'value'];
  public chartTitle: string = $localize`overall count comparison`;

  @Input()
  public countData!: OryxSideTypeLossesCountComparison;

  @Input()
  public typeName: string = '';

  public customColors: Record<string, string> = {
    [OryxSideNames.RUSSIA]: 'red',
    [OryxSideNames.UKRAINE]: 'blue',
  };
  constructor(private _translatePipe: TranslatePipe) {
    this.customColors = {
      [this._translatePipe.transform(OryxSideNames.RUSSIA)]: 'red',
      [this._translatePipe.transform(OryxSideNames.UKRAINE)]: 'blue',
    };
  }
}
