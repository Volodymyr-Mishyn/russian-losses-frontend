import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxStatistics } from '../../../../_models/data/oryx/oryx-model';

@Component({
  selector: 'app-oryx-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oryx-statistics.component.html',
  styleUrl: './oryx-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxStatisticsComponent {
  @Input()
  public statistics!: OryxStatistics;
}
