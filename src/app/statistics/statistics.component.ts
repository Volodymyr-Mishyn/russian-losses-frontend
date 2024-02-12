import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  isDevMode,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { ChangeLanguageComponent } from '../components/change-language/change-language.component';
import { Observable, Subscription } from 'rxjs';
import { LoadingIndicationService } from './services/loading-indication.service';
import { ThemeService } from '../services/theme.service';
import { PlatformService } from '../services/platform.service';
import { debounce } from '../_helpers/debounce';

const NAVIGATION: Array<NavigationElement> = [
  {
    title: $localize`Min. of Defense`,
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
    title: $localize`API`,
    isMatIcon: true,
    isIconRegistered: true,
    icon: 'api',
    tooltip: $localize`Application programming interface`,
    route: `/statistics/api`,
  },
  {
    title: $localize`About`,
    tooltip: $localize`How it works / About me`,
    isMatIcon: true,
    icon: 'info',
    route: `/statistics/about`,
  },
];

function adjustLayoutHeight(): void {
  console.warn('Adjusting content height for mobile devices.');
  let vh: number = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  const contentWrapper: HTMLElement | null =
    document.querySelector('.content-wrapper');
  if (contentWrapper) {
    contentWrapper.style.height = `calc(${vh * 100}px - 64px)`;
  }
}

const adjustLayoutHeightDebounced: () => void = debounce(() => {
  adjustLayoutHeight();
  setTimeout(adjustLayoutHeight, 150);
}, 250);

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    NavigationListComponent,
    ToggleThemeComponent,
    ChangeLanguageComponent,
  ],
  providers: [
    { provide: TranslationService, useClass: StatisticsTranslationService },
    { provide: DateAdapter, useClass: CustomDateAdapterService },
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnDestroy {
  public isLoading$: Observable<boolean> =
    this._loadingIndicationService.loading$;

  public mobileQuery: MediaQueryList;
  public navigationList = NAVIGATION;
  public spinnerColor: 'primary' | 'accent' = 'primary';
  private _themeSubscription!: Subscription;
  private _mobileQueryListener!: () => void;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    private _registerIconsService: RegisterIconsService,
    private _loadingIndicationService: LoadingIndicationService,
    private _themeService: ThemeService,
    private _platformService: PlatformService
  ) {
    this._registerIconsService.registerIcons(['trident', 'api']);
    this.mobileQuery = this._media.matchMedia('(max-width: 640px)');
    this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this._themeSubscription = this._themeService.theme$.subscribe((theme) => {
      this.spinnerColor = theme === 'dark' ? 'accent' : 'primary';
    });
    if (this._platformService.isRunningOnBrowser()) {
      window.addEventListener('resize', adjustLayoutHeightDebounced);
      adjustLayoutHeight();
    }
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this._themeSubscription.unsubscribe();
    if (this._platformService.isRunningOnBrowser()) {
      window.removeEventListener('resize', adjustLayoutHeightDebounced);
    }
  }

  public isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  public isLanguageChangeAvailable(): boolean {
    return !isDevMode();
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
