import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { OryxSideNames } from '../../_models/data/oryx/oryx.types';
import { selectOryxSideLosses } from '../../_store/selectors/oryx.selectors';
import { OryxRouteMetadata } from '../_models/oryx-route-metadata';
import { OryxSideLossesPresenterComponent } from './components/oryx-side-losses-presenter/oryx-side-losses-presenter.component';
import { SeoService } from '../../../services/seo.service';

const SEO_METADATA = {
  [OryxSideNames.RUSSIA]: {
    title: $localize`:@@pageTitleOryxRussia:Russian losses during invasion of Ukraine according to Oryx OSINT`,
    ogTitle: $localize`:@@ogTitleOryxRussia:Russian losses during invasion of Ukraine according to Oryx OSINT`,
    ogDescription: $localize`:@@ogDescriptionOryxRussia:Constantly updating data from Oryx OSINT about russian losses in the ongoing russian invasion of Ukraine`,
  },
  [OryxSideNames.UKRAINE]: {
    title: $localize`:@@pageTitleOryxUkraine:Ukrainian losses during unjustified russian invasion of Ukraine according to Oryx OSINT`,
    ogTitle: $localize`:@@ogTitleOryxUkraine:Ukrainian losses during unjustified russian invasion of Ukraine according to Oryx OSINT`,
    ogDescription: $localize`:@@ogDescriptionOryxUkraine:Constantly updating data from Oryx OSINT about ukrainian losses in the ongoing russian invasion of Ukraine`,
  },
};

const URL_SEO_METADATA = {
  [OryxSideNames.RUSSIA]: 'russia',
  [OryxSideNames.UKRAINE]: 'Ukraine',
};

@Component({
  selector: 'app-oryx-country-losses',
  standalone: true,
  imports: [CommonModule, OryxSideLossesPresenterComponent],
  templateUrl: './oryx-country-losses.component.html',
  styleUrl: './oryx-country-losses.component.scss',
})
export class OryxCountryLossesComponent implements OnDestroy {
  private _destroy$ = new Subject();

  public sideMetadata$: Observable<OryxRouteMetadata> = this._route.data.pipe(
    takeUntil(this._destroy$),
    filter((data) => !!data),
    map((data) => ({
      country: data['country'] as OryxSideNames,
      url: data['url'] as string,
    }))
  );

  public sideData$ = this.sideMetadata$.pipe(
    tap(({ country }) => {
      if (country) {
        this._setMetaTags(country);
      }
    }),
    switchMap(({ country }) =>
      this._store.select(selectOryxSideLosses(country))
    )
  );

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _seoService: SeoService
  ) {}

  private _setMetaTags(country: OryxSideNames): void {
    this._seoService.updateTitle(SEO_METADATA[country].title);
    this._seoService.updateMetaTags([
      { name: 'og:title', content: SEO_METADATA[country].ogTitle },
      { name: 'og:description', content: SEO_METADATA[country].ogDescription },
      { name: 'twitter:title', content: SEO_METADATA[country].title },
      {
        name: 'twitter:description',
        content: SEO_METADATA[country].ogDescription,
      },
    ]);
    this._seoService.setLinkDataTags(
      'statistics/oryx/country-losses/' + URL_SEO_METADATA[country]
    );
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
