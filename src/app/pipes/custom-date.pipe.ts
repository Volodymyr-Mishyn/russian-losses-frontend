import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCustomDate',
  standalone: true,
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) {
    super(_locale);
  }

  override transform(value: any, format: string = 'MMMM YYYY'): any {
    let dateString = super.transform(value, format);
    if (this._locale === 'uk' && format === 'MMMM YYYY') {
      dateString = dateString
        ?.replace('січня', 'січень')
        .replace('лютого', 'лютий')
        .replace('березня', 'березень')
        .replace('квітня', 'квітень')
        .replace('травня', 'травень')
        .replace('червня', 'червень')
        .replace('липня', 'липень')
        .replace('серпня', 'серпень')
        .replace('вересня', 'вересень')
        .replace('жовтня', 'жовтень')
        .replace('листопада', 'листопад')
        .replace('грудня', 'грудень') as string;
    }
    return dateString;
  }
}
