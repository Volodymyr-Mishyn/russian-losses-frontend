import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ScrollToTopComponent } from '../components/scroll-to-top/scroll-to-top.component';
import { TranslationService } from '../../_translate/translation.service';
import { OryxTranslationService } from './services/oryx-translation.service';
import { ResetScrollDirective } from '../../directives/reset-scroll.directive';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ScrollToTopComponent,
    ResetScrollDirective,
  ],
  providers: [
    {
      provide: TranslationService,
      useClass: OryxTranslationService,
    },
  ],
  templateUrl: './oryx.component.html',
  styleUrl: './oryx.component.scss',
})
export class OryxComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollDiv', { read: ElementRef, static: false })
  public scrollContainer!: ElementRef;
  public containerReady = false;

  public links = [
    {
      name: $localize`Russia`,
      route: ['/statistics', 'oryx', 'country-losses', 'russia'],
    },
    {
      name: $localize`Ukraine`,
      route: ['/statistics', 'oryx', 'country-losses', 'Ukraine'],
    },
    {
      name: $localize`Compare`,
      route: ['/statistics', 'oryx', 'compare-losses'],
    },
  ];

  private _destroy$ = new Subject();
  constructor(private _route: ActivatedRoute) {}

  private scrollToFragment(fragment: string): void {
    const element = document.querySelector('#' + fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.containerReady = true;
    });
  }

  public ngAfterViewInit(): void {
    this._route.fragment
      .pipe(takeUntil(this._destroy$), distinctUntilChanged())
      .subscribe((fragment) => {
        if (fragment) {
          this.scrollToFragment(fragment);
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
