import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxEntityModel } from '../../../../_models/data/oryx/oryx-model';
import { OryxEntityLossesDetailsComponent } from '../oryx-entity-losses-details/oryx-entity-losses-details.component';

@Component({
  selector: 'app-oryx-entity-losses',
  standalone: true,
  imports: [CommonModule, OryxEntityLossesDetailsComponent],
  templateUrl: './oryx-entity-losses.component.html',
  styleUrl: './oryx-entity-losses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxEntityLossesComponent {
  @Input()
  public entityModel!: OryxEntityModel;

  @Input()
  public showHeader = false;
}
