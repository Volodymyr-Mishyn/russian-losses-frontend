import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
import { MatToolbarModule } from '@angular/material/toolbar';

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
    title: $localize`Support Ukraine`,
    icon: 'assets/img/flag_with_trident.svg',
    tooltip: $localize`Support/Donate Ukraine`,
    route: `/statistics/support`,
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
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    NavigationListComponent,
    ToggleThemeComponent,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: TranslationService, useClass: StatisticsTranslationService },
    { provide: DateAdapter, useClass: CustomDateAdapterService },
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;
  public navigationList = NAVIGATION;
  private _mobileQueryListener!: () => void;

  constructor(
    private _registerIconsService: RegisterIconsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    private _router: Router
  ) {
    this._registerIconsService.registerIcons(['trident']);
    this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public isMobile(): boolean {
    return this.mobileQuery.matches;
  }
}
