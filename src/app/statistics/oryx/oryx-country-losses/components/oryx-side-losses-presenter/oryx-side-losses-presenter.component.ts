import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { OryxRouteMetadata } from '../../../_models/oryx-route-metadata';
import { OryxSideLosses } from '../../../../_models/data/oryx/oryx-model';
import { OryxTypeLossesComponent } from '../oryx-type-losses/oryx-type-losses.component';
import { OryxStatisticsComponent } from '../oryx-statistics/oryx-statistics.component';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { BaseRouteUrlService } from '../../../../services/base-route-url.service';
import { SocialShareButtonComponent } from '../../../../../components/social-share/social-share-button/social-share-button.component';

@Component({
  selector: 'app-oryx-side-losses-presenter',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    OryxTypeLossesComponent,
    OryxStatisticsComponent,
    SocialShareButtonComponent,
  ],
  providers: [TranslatePipe],
  templateUrl: './oryx-side-losses-presenter.component.html',
  styleUrl: './oryx-side-losses-presenter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxSideLossesPresenterComponent {
  private _data!: OryxSideLosses;

  public sideName!: string;
  public baseUrl: string | null = null;

  @Input()
  public metadata!: OryxRouteMetadata;
  @Input()
  public get data(): OryxSideLosses {
    return this._data;
  }

  public set data(value: OryxSideLosses) {
    this._data = value;
    this.sideName = this._translatePipe.transform(
      this._data.countryName + '_name_oryx'
    );
  }
  constructor(
    private _translatePipe: TranslatePipe,
    private _baseRouteUrlService: BaseRouteUrlService
  ) {
    this._prepareBaseUrl();
  }

  private _prepareBaseUrl(): void {
    this.baseUrl = this._baseRouteUrlService.getBaseUrl();
  }
}
