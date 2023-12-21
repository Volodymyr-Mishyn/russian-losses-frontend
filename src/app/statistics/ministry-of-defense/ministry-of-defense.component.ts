import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSelectionComponent } from '../components/range-selection/range-selection.component';
import { DateRange, DateRangeWithCount } from '../_models/range';
import {
  BehaviorSubject,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMoDDataInRangeWithCalculation } from '../_store/selectors/mod.selectors';
import { MinistryOfDefenseStatisticsPresenterComponent } from './components/ministry-of-defense-statistics-presenter/ministry-of-defense-statistics-presenter.component';
import { MoDDataSliceWithCalculated } from '../_models/data/mod/mod-model';
import { DATE_OF_INVASION_INSTANCE } from '../../_constants/russian-invasion-date';
import { RegisterIconsService } from '../../services/register-icons.service';
import { ALL_MOD_ENTITIES } from '../_models/data/mod/mod-entities';
import { ScrollToTopComponent } from '../components/scroll-to-top/scroll-to-top.component';
import { TranslationService } from '../../_translate/translation.service';
import { MinistryOfDefenseTranslationService } from './services/ministry-of-defense-translation.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RangeSelectionComponent,
    MinistryOfDefenseStatisticsPresenterComponent,
    ScrollToTopComponent,
  ],
  providers: [
    {
      provide: TranslationService,
      useClass: MinistryOfDefenseTranslationService,
    },
  ],
  templateUrl: './ministry-of-defense.component.html',
  styleUrl: './ministry-of-defense.component.scss',
})
export class MinistryOfDefenseComponent implements OnInit, OnDestroy {
  private _rangeSubject = new BehaviorSubject<DateRange | null>(null);
  private _range$ = this._rangeSubject.asObservable();
  private _destroy$ = new Subject();
  private _currentDate = new Date();

  @ViewChild('scrollContainer', { read: ElementRef, static: false })
  public scrollContainer!: ElementRef;
  public containerReady = false;
  public localRange!: DateRangeWithCount;

  public data$: Observable<MoDDataSliceWithCalculated> = this._range$.pipe(
    takeUntil(this._destroy$),
    switchMap((value) =>
      this._store.select(selectMoDDataInRangeWithCalculation(value))
    )
  );

  constructor(
    private _store: Store,
    private _registerIconsService: RegisterIconsService
  ) {
    this._setLocalRange(DATE_OF_INVASION_INSTANCE, this._currentDate);
    this._registerIcons();
  }

  private _registerIcons(): void {
    this._registerIconsService.registerIcons(ALL_MOD_ENTITIES, 'mod_', 'mod');
  }

  private _setLocalRange(start: Date, end: Date): void {
    const timeDifference = end.getTime() - start.getTime();
    const diffDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    this.localRange = {
      start,
      end,
      days: diffDays,
    };
  }

  public setRange(range: DateRange | null) {
    if (range === null) {
      this._rangeSubject.next(null);
      this._setLocalRange(DATE_OF_INVASION_INSTANCE, this._currentDate);
    } else {
      const start = new Date(range.start);
      const end = new Date(range.end);
      end.setHours(23);
      end.setMinutes(59);
      this._setLocalRange(start, end);
      this._rangeSubject.next({ start, end });
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.containerReady = true;
    });
  }
}
