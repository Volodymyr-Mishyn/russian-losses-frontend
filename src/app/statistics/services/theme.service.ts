import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvailableThemes, Theme } from '../../_constants/themes';

@Injectable({
  providedIn: 'platform',
})
export class ThemeService {
  private _theme$ = new BehaviorSubject<Theme>(AvailableThemes.LIGHT);
  public theme$ = this._theme$.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this._theme$.next(savedTheme as Theme);
    } else {
      const theme = prefersDark ? AvailableThemes.DARK : AvailableThemes.LIGHT;
      localStorage.setItem('theme', theme);
      this._theme$.next(theme);
    }
  }

  setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    this._theme$.next(theme);
  }
}
