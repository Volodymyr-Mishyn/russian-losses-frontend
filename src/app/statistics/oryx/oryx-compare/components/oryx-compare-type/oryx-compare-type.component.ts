import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxEntityTypeComparison } from '../../../../_models/data/oryx/oryx-comparison';
import { OryxCompareTypeOverallCountsComponent } from '../oryx-compare-type-overall-counts/oryx-compare-type-overall-counts.component';

@Component({
  selector: 'app-oryx-compare-type',
  standalone: true,
  imports: [CommonModule, OryxCompareTypeOverallCountsComponent],
  templateUrl: './oryx-compare-type.component.html',
  styleUrl: './oryx-compare-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxCompareTypeComponent {
  @Input()
  public entityTypeComparison!: OryxEntityTypeComparison;
}
