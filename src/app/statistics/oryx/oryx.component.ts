import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from '../components/scroll-to-top/scroll-to-top.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ScrollToTopComponent,
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
