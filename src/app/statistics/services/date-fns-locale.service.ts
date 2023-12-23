import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import enUS from 'date-fns/locale/en-US';
import uk from 'date-fns/locale/uk';
@Injectable({
  providedIn: 'root',
})
export class DateFnsLocaleService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  public getLocale() {
    switch (this.locale) {
      case 'en-US':
        return enUS;
      case 'uk':
        return uk;
      default:
        return enUS;
    }
  }
}
