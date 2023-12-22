import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationElement } from './_models/navigation/navigation-element';
import { NavigationListComponent } from './components/navigation-list/navigation-list.component';
import { TranslationService } from '../_translate/translation.service';
import { StatisticsTranslationService } from './services/statistics-translation.service';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapterService } from './services/custom-date-adapter.service';
import { ToggleThemeComponent } from '../components/toggle-theme/toggle-theme.component';

const NAVIGATION: Array<NavigationElement> = [
  {
    title: 'mod',
    tooltip: 'Ministry of defense',
    route: '/statistics/ministry-of-defense',
  },
  { title: 'oryx', tooltip: 'Oryx data', route: '/statistics/oryx' },
  { title: 'about', tooltip: 'About', route: '/statistics/about' },
];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    NavigationListComponent,
    ToggleThemeComponent,
  ],
  providers: [
    { provide: TranslationService, useClass: StatisticsTranslationService },
    { provide: DateAdapter, useClass: CustomDateAdapterService },
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  public navigationList = NAVIGATION;
}
