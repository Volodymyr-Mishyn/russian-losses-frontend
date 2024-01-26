import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

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

  constructor(private router: Router) {
    this._currentUrl = router.url;
    this._routerEventsSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this._currentUrl = (event as NavigationEnd).urlAfterRedirects;
      });
  }

  @HostListener('click') onClick() {
    if (!this._scrollContainer.nativeElement) console.log(this._currentUrl);
    const path = this.appRoutePath.join('/');
    if (this._currentUrl !== path) {
      this._scrollContainer.nativeElement.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
  }

  public ngOnDestroy() {
    this._routerEventsSubscription.unsubscribe();
  }
}
