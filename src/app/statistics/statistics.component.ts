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
import { RegisterIconsService } from '../services/register-icons.service';
import { MatIconModule } from '@angular/material/icon';

const NAVIGATION: Array<NavigationElement> = [
  {
    title: $localize`MoD`,
    tooltip: $localize`Ministry of defense of Ukraine data`,
    icon: 'assets/img/mod.svg',
    route: `/statistics/ministry-of-defense`,
  },
  {
    title: $localize`Oryx`,
    tooltip: $localize`Oryx OSINT data`,
    icon: 'assets/img/oryx.svg',
    route: `/statistics/oryx`,
  },
  {
    title: $localize`About`,
    tooltip: $localize`About`,
    route: `/statistics/about`,
  },
];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    NavigationListComponent,
    ToggleThemeComponent,
    MatIconModule,
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

  constructor(private _registerIconsService: RegisterIconsService) {
    this._registerIconsService.registerIcons(['trident']);
  }
}
