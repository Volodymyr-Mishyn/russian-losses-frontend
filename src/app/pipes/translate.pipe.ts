import { Pipe, type PipeTransform } from '@angular/core';
import { TranslationService } from '../_translate/translation.service';

@Pipe({
  name: 'appTranslate',
  standalone: true,
  pure: true,
})
export class TranslatePipe implements PipeTransform {
  constructor(private readonly _translationService: TranslationService) {}
  transform(value: unknown, ...args: unknown[]): string {
    return this._translationService.translate(value as string);
  }
}
