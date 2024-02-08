import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OryxEntityTypeComparison } from '../../../../_models/data/oryx/oryx-comparison';
import { OryxCompareTypeOverallCountsComponent } from '../oryx-compare-type-overall-counts/oryx-compare-type-overall-counts.component';
import { OryxCompareTypeEntitiesComponent } from '../oryx-compare-type-entities/oryx-compare-type-entities.component';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { PlatformService } from '../../../../../services/platform.service';
import { SocialShareButtonComponent } from '../../../../../components/social-share/social-share-button/social-share-button.component';

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
    private _platformService: PlatformService,
    private _location: Location,
    private _router: Router
  ) {
    this._prepareBaseUrl();
  }

  private _prepareBaseUrl(): void {
    if (!this._platformService.isRunningOnBrowser()) {
      return;
    }
    this.baseUrl =
      window.location.origin +
      this._location.prepareExternalUrl(this._router.url);
  }
}
