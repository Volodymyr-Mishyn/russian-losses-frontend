import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EntityLossFlat } from '../../../../_models/data/mod/mod-model';

@Component({
  selector: 'app-casualty-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './casualty-cell.component.html',
  styleUrl: './casualty-cell.component.scss',
})
export class CasualtyCellComponent {
  @Input()
  public entityLoss!: EntityLossFlat;
}
