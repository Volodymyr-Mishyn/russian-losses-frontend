import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { OryxRouteMetadata } from '../../../_models/oryx-route-metadata';
import { OryxSideLosses } from '../../../../_models/data/oryx/oryx-model';
import { OryxTypeLossesComponent } from '../oryx-type-losses/oryx-type-losses.component';
import { OryxStatisticsComponent } from '../oryx-statistics/oryx-statistics.component';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';

@Component({
  selector: 'app-oryx-side-losses-presenter',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    OryxTypeLossesComponent,
    OryxStatisticsComponent,
  ],
  providers: [TranslatePipe],
  templateUrl: './oryx-side-losses-presenter.component.html',
  styleUrl: './oryx-side-losses-presenter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxSideLossesPresenterComponent {
  @Input()
  public metadata!: OryxRouteMetadata;
  public sideName!: string;
  private _data!: OryxSideLosses;

  @Input()
  public get data(): OryxSideLosses {
    return this._data;
  }

  public set data(value: OryxSideLosses) {
    this._data = value;
    this.sideName = this._translatePipe.transform(this._data.countryName);
  }
  constructor(private _translatePipe: TranslatePipe) {}
}
