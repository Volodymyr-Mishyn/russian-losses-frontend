import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LANGUAGES, LanguageInfo } from '../../_constants/languages';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {
  public currentLanguage!: string;
  public languages: Array<LanguageInfo> = LANGUAGES;

  constructor(@Inject(LOCALE_ID) private _locale: string) {
    this.currentLanguage = this._locale;
  }

  public changeLanguage(language: LanguageInfo): void {
    const pathArray = window.location.pathname.split('/');
    const currentLanguage = pathArray[1];
    if (currentLanguage !== language.localeName) {
      pathArray[1] = language.baseHref;
      const newPath = pathArray.join('/');
      window.location.href = newPath;
    }
  }
}
