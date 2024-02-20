import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DATE_OF_INVASION_INSTANCE } from '../../../_constants/russian-invasion-date';
import { DateRange } from '../../_models/range';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-range-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [],
  templateUrl: './range-selection.component.html',
  styleUrl: './range-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSelectionComponent implements OnChanges {
  @Input()
  public startDate: Date = new Date(DATE_OF_INVASION_INSTANCE);

  @Input()
  public endDate: Date = new Date();

  @Output()
  public rangeChanged = new EventEmitter<DateRange | null>();

  public rangeForm = this._formBuilder.group({
    range: this._formBuilder.group({
      start: [this.startDate],
      end: [this.endDate],
    }),
  });

  public fullRangeTooltip = $localize`:@@statistics.rangeSelection.fullRangeTooltip:Select full range since the start of the invasion`;
  constructor(private _formBuilder: FormBuilder) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const today = new Date();
  }

  onDateRangeChange(): void {
    const start = this.rangeForm.get('range')?.get('start')?.value;
    const end = this.rangeForm.get('range')?.get('end')?.value;
    if (start instanceof Date && end instanceof Date) {
      this.rangeChanged.emit({ start, end });
    }
  }

  selectFullRange(): void {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    this.rangeForm
      .get('range')
      ?.patchValue({ start: DATE_OF_INVASION_INSTANCE, end: today });
    this.rangeChanged.emit(null);
  }
}
