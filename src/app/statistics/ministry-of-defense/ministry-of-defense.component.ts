import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSelectionComponent } from '../components/range-selection/range-selection.component';
import { DateRange } from '../_models/range';
import {
  BehaviorSubject,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMoDDataInRangeWithCalculation } from '../_store/selectors/mod.selectors';
import { MinistryOfDefenseStatisticsPresenterComponent } from './components/ministry-of-defense-statistics-presenter/ministry-of-defense-statistics-presenter.component';
import { MoDDataSliceWithCalculated } from '../_models/data/mod/mod-model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RangeSelectionComponent,
    MinistryOfDefenseStatisticsPresenterComponent,
  ],
  templateUrl: './ministry-of-defense.component.html',
  styleUrl: './ministry-of-defense.component.scss',
})
export class MinistryOfDefenseComponent implements OnDestroy {
  private _rangeSubject = new BehaviorSubject<DateRange | null>(null);
  private _range$ = this._rangeSubject.asObservable();
  private _destroy$ = new Subject();
  public data$: Observable<MoDDataSliceWithCalculated> = this._range$.pipe(
    takeUntil(this._destroy$),
    switchMap((value) =>
      this._store.select(selectMoDDataInRangeWithCalculation(value))
    )
  );

  constructor(private _store: Store) {
    this.data$.subscribe((v) => console.log(v));
  }

  public setRange(range: DateRange | null) {
    if (range === null) {
      this._rangeSubject.next(null);
    } else {
      const start = new Date(range.start);
      const end = new Date(range.end);
      end.setHours(23);
      end.setMinutes(59);
      this._rangeSubject.next({ start, end });
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
