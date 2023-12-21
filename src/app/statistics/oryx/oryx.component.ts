import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from '../components/scroll-to-top/scroll-to-top.component';
import { TranslationService } from '../../_translate/translation.service';
import { OryxTranslationService } from './services/oryx-translation.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ScrollToTopComponent,
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

  public ngOnInit(): void {
    setTimeout(() => {
      this.containerReady = true;
    });
  }
}
