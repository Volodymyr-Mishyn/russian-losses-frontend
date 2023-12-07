import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { OryxRouteMetadata } from '../../../_models/oryx-route-metadata';
import { OryxSideLosses } from '../../../../_models/data/oryx/oryx-model';
import { OryxTypeLossesComponent } from '../oryx-type-losses/oryx-type-losses.component';
import { OryxStatisticsComponent } from '../oryx-statistics/oryx-statistics.component';

@Component({
  selector: 'app-oryx-side-losses-presenter',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    OryxTypeLossesComponent,
    OryxStatisticsComponent,
  ],
  templateUrl: './oryx-side-losses-presenter.component.html',
  styleUrl: './oryx-side-losses-presenter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxSideLossesPresenterComponent {
  @Input()
  public metadata!: OryxRouteMetadata;

  @Input()
  public data!: OryxSideLosses;
}
