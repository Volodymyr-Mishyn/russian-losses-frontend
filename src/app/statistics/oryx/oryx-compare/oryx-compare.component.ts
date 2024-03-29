import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOryxComparison } from '../../_store/selectors/oryx.selectors';
import { OryxCompareTypeComponent } from './components/oryx-compare-type/oryx-compare-type.component';
import { Observable } from 'rxjs';
import { OryxComparison } from '../../_models/data/oryx/oryx-comparison';
import { MatDividerModule } from '@angular/material/divider';
import { SeoService } from '../../../services/seo.service';
import { BaseRouteUrlService } from '../../services/base-route-url.service';
import { SocialShareButtonComponent } from '../../../components/social-share/social-share-button/social-share-button.component';

@Component({
  selector: 'app-oryx-compare',
  standalone: true,
  imports: [
    CommonModule,
    OryxCompareTypeComponent,
    MatDividerModule,
    SocialShareButtonComponent,
  ],
  templateUrl: './oryx-compare.component.html',
  styleUrl: './oryx-compare.component.scss',
})
export class OryxCompareComponent implements OnInit {
  public title = $localize`:@@pageTitleComparisonOryx:Comparison of russian and Ukrainian losses during unjustified russian invasion of Ukraine according to Oryx OSINT`;
  public ogTitle = $localize`:@@ogTitleComparisonOryx:Comparison of russian and Ukrainian losses during unjustified russian invasion of Ukraine according to Oryx OSINT`;
  public ogDescription = $localize`:@@ogDescriptionComparisonOryx:Constantly updating comparison of russian and Ukrainian losses in the ongoing Russian invasion of Ukraine according to Oryx OSINT`;
  public baseUrl: string | null = null;

  public oryxTypesComparison$: Observable<OryxComparison> =
    this._store.select(selectOryxComparison);

  private _setMetaTags(): void {
    this._seoService.updateTitle(this.title);
    this._seoService.updateMetaTags([
      { name: 'og:title', content: this.ogTitle },
      { name: 'og:description', content: this.ogDescription },
      { name: 'twitter:title', content: this.ogTitle },
      { name: 'twitter:description', content: this.ogDescription },
    ]);
    this._seoService.setLinkDataTags('statistics/oryx/compare-losses');
  }

  constructor(
    private _store: Store,
    private _seoService: SeoService,
    private _baseRouteUrlService: BaseRouteUrlService
  ) {
    this._prepareBaseUrl();
  }

  private _prepareBaseUrl(): void {
    this.baseUrl = this._baseRouteUrlService.getBaseUrl();
  }

  public ngOnInit(): void {
    this._setMetaTags();
  }
}
