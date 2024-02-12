import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxEntityTypeComparison } from '../../../../_models/data/oryx/oryx-comparison';
import { OryxCompareTypeOverallCountsComponent } from '../oryx-compare-type-overall-counts/oryx-compare-type-overall-counts.component';
import { OryxCompareTypeEntitiesComponent } from '../oryx-compare-type-entities/oryx-compare-type-entities.component';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { SocialShareButtonComponent } from '../../../../../components/social-share/social-share-button/social-share-button.component';
import { BaseRouteUrlService } from '../../../../services/base-route-url.service';

@Component({
  selector: 'app-oryx-compare-type',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatProgressSpinnerModule,
    OryxCompareTypeOverallCountsComponent,
    OryxCompareTypeEntitiesComponent,
    TranslatePipe,
    SocialShareButtonComponent,
  ],
  providers: [TranslatePipe],
  templateUrl: './oryx-compare-type.component.html',
  styleUrl: './oryx-compare-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OryxCompareTypeComponent {
  private _entityTypeComparison!: OryxEntityTypeComparison;

  public typeName: string = '';
  public typeCode!: string;
  public baseUrl: string | null = null;

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
    this.typeCode = this._entityTypeComparison.name;
    this.typeName = this._translatePipe.transform(
      'oryx_type_' + this._entityTypeComparison.name
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
