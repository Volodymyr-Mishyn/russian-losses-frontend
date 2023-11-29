import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EntityLossFlat } from '../../../../../_models/data/mod/mod-model';
import { CasualtyComparisonDirective } from '../directives/casualty-comparison.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-casualty-cell',
  standalone: true,
  imports: [CommonModule, CasualtyComparisonDirective, MatTooltipModule],
  templateUrl: './casualty-cell.component.html',
  styleUrl: './casualty-cell.component.scss',
})
export class CasualtyCellComponent implements OnChanges {
  public tooltip: string = '';
  @Input()
  public entityLoss!: EntityLossFlat;

  @Input()
  public dateString!: string;
  @Input()
  public displayComparisonToAverage = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.entityLoss && this.dateString) {
      const date = new Date(this.dateString);
      const { increment, name, total, calculatedIncrement } = this.entityLoss;
      const baseString = `${name} (${date.toLocaleDateString()}) : (+${increment}) / ${total} ;`;
      if (calculatedIncrement) {
        const { comparedToAverage, average } = calculatedIncrement;
        this.tooltip = baseString + ` Avg: ${average} (x${comparedToAverage})`;
      } else {
        this.tooltip = baseString;
      }
    }
  }
}
