import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../statistics/services/theme.service';
import { Subscription } from 'rxjs';
import { AvailableThemes, Theme } from '../../_constants/themes';

@Component({
  selector: 'app-toggle-theme',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss',
})
export class ToggleThemeComponent implements OnInit, OnDestroy {
  private _themeSubscription!: Subscription;
  private _theme!: Theme;
  constructor(private _themeService: ThemeService) {}
  public toggleTheme(): void {
    this._themeService.setTheme(
      this._theme === AvailableThemes.DARK
        ? AvailableThemes.LIGHT
        : AvailableThemes.DARK
    );
  }
  public ngOnInit(): void {
    this._themeSubscription = this._themeService.theme$.subscribe((theme) => {
      this._theme = theme;
      document.body.classList.toggle('dark-theme', theme === 'dark');
    });
  }
  public ngOnDestroy(): void {
    this._themeSubscription.unsubscribe();
  }
}
