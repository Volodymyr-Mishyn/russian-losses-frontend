import { Injectable } from '@angular/core';
import { StatisticsTranslationService } from '../../services/statistics-translation.service';
import { ORYX_TRANSLATIONS } from '../_translation/oryx-translation';

@Injectable()
export class OryxTranslationService extends StatisticsTranslationService {
  public override translate(value: string): string {
    const translationKey = ORYX_TRANSLATIONS[value] as string;
    if (translationKey) {
      return translationKey;
    }
    return super.translate(value);
  }
}
