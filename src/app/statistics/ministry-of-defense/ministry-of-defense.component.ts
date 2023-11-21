import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSelectionComponent } from '../components/range-selection/range-selection.component';
import { DateRange } from '../_models/range';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMoDDataInRangeWithCalculation } from '../_store/selectors/mod.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, RangeSelectionComponent],
  templateUrl: './ministry-of-defense.component.html',
  styleUrl: './ministry-of-defense.component.scss',
})
export class MinistryOfDefenseComponent implements OnDestroy {
  private _rangeSubject = new BehaviorSubject<DateRange | null>(null);
  private _range$ = this._rangeSubject.asObservable();
  private _destroy$ = new Subject();
  public data$ = this._range$.pipe(
    takeUntil(this._destroy$),
    switchMap((value) =>
      this._store.select(selectMoDDataInRangeWithCalculation(value))
    )
  );

  constructor(private _store: Store) {}

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
