import { Injectable } from '@angular/core';
import { BaseTranslationService } from '../../services/base-translation.service';
import { STATISTICS_TRANSLATIONS } from '../_translate/statistic.translation';

@Injectable()
export class StatisticsTranslationService extends BaseTranslationService {
  public override translate(value: string): string {
    const translationKey = STATISTICS_TRANSLATIONS[value] as string;
    if (translationKey) {
      return translationKey;
    }
    return super.translate(value);
  }
}
