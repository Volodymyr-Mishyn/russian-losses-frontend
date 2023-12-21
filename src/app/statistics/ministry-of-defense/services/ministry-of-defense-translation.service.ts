import { Injectable } from '@angular/core';
import { MOD_TRANSLATIONS } from '../_translate/mod.translation';
import { StatisticsTranslationService } from '../../services/statistics-translation.service';

@Injectable()
export class MinistryOfDefenseTranslationService extends StatisticsTranslationService {
  public override translate(value: string): string {
    const translationKey = MOD_TRANSLATIONS[value] as string;
    if (translationKey) {
      return translationKey;
    }
    return super.translate(value);
  }
}
