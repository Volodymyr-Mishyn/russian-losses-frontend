import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[appResetScroll]',
  standalone: true,
})
export class ResetScrollDirective implements OnDestroy {
  @Input() appRoutePath: Array<string> = [];
  private _currentUrl!: string;
  private _routerEventsSubscription!: Subscription;

  private _scrollContainer!: ElementRef;
  public showScroll: boolean = false;

  @Input()
  public threshold: number = 100;

  @Input() set scrollContainer(scrollContainer: ElementRef) {
    this._scrollContainer = scrollContainer;
  }

  constructor(
    private _router: Router,
    private _platformService: PlatformService
  ) {
    this._currentUrl = this._router.url;
    this._routerEventsSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this._currentUrl = (event as NavigationEnd).urlAfterRedirects;
      });
  }

  isMobileDevice() {
    const smallScreen = window.matchMedia(
      'only screen and (max-width: 980px)'
    ).matches;
    const touchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return smallScreen && touchDevice;
  }

  @HostListener('click') onClick(): void {
    if (this._platformService.isRunningOnBrowser()) {
      if (this.isMobileDevice()) {
        return;
      }
      const path = this.appRoutePath.join('/');
      if (this._currentUrl !== path) {
        this._scrollContainer.nativeElement.scrollTo({
          top: 0,
          behavior: 'instant',
        });
      }
    }
  }

  public ngOnDestroy() {
    this._routerEventsSubscription.unsubscribe();
  }
}
