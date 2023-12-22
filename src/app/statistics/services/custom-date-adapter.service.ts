import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class CustomDateAdapterService extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1; // Monday
  }
}
