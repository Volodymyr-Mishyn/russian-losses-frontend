import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxEntityTypeComparison } from '../../../../_models/data/oryx/oryx-comparison';
import { OryxCompareTypeOverallCountsComponent } from '../oryx-compare-type-overall-counts/oryx-compare-type-overall-counts.component';
import { OryxCompareTypeEntitiesComponent } from '../oryx-compare-type-entities/oryx-compare-type-entities.component';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-oryx-compare-type',
  standalone: true,
  imports: [
    CommonModule,
    OryxCompareTypeOverallCountsComponent,
    OryxCompareTypeEntitiesComponent,
    TranslatePipe,
  ],
  providers: [TranslatePipe],
  templateUrl: './oryx-compare-type.component.html',
  styleUrl: './oryx-compare-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxCompareTypeComponent {
  private _entityTypeComparison!: OryxEntityTypeComparison;

  public typeName: string = '';

  @Input()
  public get entityTypeComparison(): OryxEntityTypeComparison {
    return this._entityTypeComparison;
  }

  public set entityTypeComparison(comparison: OryxEntityTypeComparison) {
    this._entityTypeComparison = {
      ...comparison,
      countComparison: comparison.countComparison.map((countElement) => ({
        ...countElement,
        name: this._translatePipe.transform(countElement.name),
      })),
    };
    this.typeName = this._translatePipe.transform(
      'oryx_type_' + this._entityTypeComparison.name
    );
  }

  constructor(private _translatePipe: TranslatePipe) {}
}
