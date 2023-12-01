import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, map, switchMap, takeUntil } from 'rxjs';
import { OryxSideNames } from '../../_models/data/oryx/oryx.types';
import { selectOryxSideLosses } from '../../_store/selectors/oryx.selectors';
import { OryxRouteMetadata } from '../_models/oryx-route-metadata';
import { OryxSideLossesPresenterComponent } from './components/oryx-side-losses-presenter/oryx-side-losses-presenter.component';

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
    switchMap(({ country }) =>
      this._store.select(selectOryxSideLosses(country))
    )
  );

  constructor(private _route: ActivatedRoute, private _store: Store) {}

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
