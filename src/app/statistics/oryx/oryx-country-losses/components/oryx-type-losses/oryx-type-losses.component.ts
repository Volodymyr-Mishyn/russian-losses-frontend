import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxEntityType } from '../../../../_models/data/oryx/oryx-model';
import { OryxStatisticsComponent } from '../oryx-statistics/oryx-statistics.component';
import { OryxEntityLossesComponent } from '../oryx-entity-losses/oryx-entity-losses.component';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-oryx-type-losses',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    OryxStatisticsComponent,
    OryxEntityLossesComponent,
  ],
  templateUrl: './oryx-type-losses.component.html',
  styleUrl: './oryx-type-losses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxTypeLossesComponent {
  @Input()
  public entityType!: OryxEntityType;
}
