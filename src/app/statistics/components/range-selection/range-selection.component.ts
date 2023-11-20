import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DATE_OF_INVASION_INSTANCE } from '../../../_constants/russian-invasion-date';

@Component({
  selector: 'app-range-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  providers: [],
  templateUrl: './range-selection.component.html',
  styleUrl: './range-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSelectionComponent {
  @Input()
  public startDate: Date = new Date(DATE_OF_INVASION_INSTANCE);

  @Input()
  public endDate: Date = new Date();

  @Output()
  public rangeChanged = new EventEmitter<{ start: Date; end: Date } | null>();

  public rangeForm = this._formBuilder.group({
    fullRange: [true],
    range: this._formBuilder.group({
      start: [this.startDate],
      end: [this.endDate],
    }),
  });
  constructor(private _formBuilder: FormBuilder) {}

  onDateRangeChange(): void {
    const start = this.rangeForm.get('range')?.get('start')?.value;
    const end = this.rangeForm.get('range')?.get('end')?.value;
    if (start instanceof Date && end instanceof Date) {
      this.rangeChanged.emit({ start, end });
    }
  }

  onCheckboxChange(): void {
    if (this.rangeForm.get('fullRange')?.value === true) {
      this.rangeChanged.emit(null);
    } else {
      this.onDateRangeChange();
    }
  }
}
