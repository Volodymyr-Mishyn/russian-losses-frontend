import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from '../components/scroll-to-top/scroll-to-top.component';
import { TranslationService } from '../../_translate/translation.service';
import { OryxTranslationService } from './services/oryx-translation.service';
import { ResetScrollDirective } from '../../directives/reset-scroll.directive';

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
export class OryxComponent implements OnInit {
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

  public ngOnInit(): void {
    setTimeout(() => {
      this.containerReady = true;
    });
  }
}
