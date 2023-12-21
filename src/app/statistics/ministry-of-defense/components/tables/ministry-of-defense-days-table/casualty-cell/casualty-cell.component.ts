import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EntityLossFlat } from '../../../../../_models/data/mod/mod-model';
import { CasualtyComparisonDirective } from '../directives/casualty-comparison.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '../../../../../../pipes/translate.pipe';

@Component({
  selector: 'app-casualty-cell',
  standalone: true,
  imports: [CommonModule, CasualtyComparisonDirective, MatTooltipModule],
  providers: [TranslatePipe],
  templateUrl: './casualty-cell.component.html',
  styleUrl: './casualty-cell.component.scss',
})
export class CasualtyCellComponent implements OnChanges {
  public tooltip: string = '';
  @Input()
  public entityLoss!: EntityLossFlat;

  @Input()
  public entityTypeName!: string;

  @Input()
  public dateString!: string;
  @Input()
  public displayComparisonToAverage = false;

  constructor(private _translatePipe: TranslatePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.entityLoss && this.dateString) {
      const date = new Date(this.dateString);
      const { increment, total, calculatedIncrement } = this.entityLoss;
      const baseString = `${this._translatePipe.transform(
        this.entityTypeName
      )} | ${this._translatePipe.transform(
        'date'
      )}: ${date.toLocaleDateString()} | +${increment} | ${this._translatePipe.transform(
        'total'
      )}: ${total}`;
      if (calculatedIncrement) {
        const { comparedToAverage, average } = calculatedIncrement;
        this.tooltip =
          baseString +
          ` | ${this._translatePipe.transform(
            'average'
          )}: ${average} (x${comparedToAverage})`;
      } else {
        this.tooltip = baseString;
      }
    }
  }
}
