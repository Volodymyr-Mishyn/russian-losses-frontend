import { Injectable } from '@angular/core';
import { TranslationService } from '../_translate/translation.service';
import { APP_TRANSLATIONS } from '../_translate/app-translation';

@Injectable({
  providedIn: 'root',
})
export class BaseTranslationService extends TranslationService {
  public translate(value: string): string {
    const translationKey = APP_TRANSLATIONS[value] as string;
    if (translationKey) {
      return translationKey;
    }
    return value;
  }
}
