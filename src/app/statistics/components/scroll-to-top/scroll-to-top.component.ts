import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
})
export class ScrollToTopComponent implements OnDestroy {
  private _scrollListener!: Function;
  private _scrollContainer!: ElementRef;
  public showScroll: boolean = false;

  @Input()
  public threshold: number = 100;

  @Input() set scrollContainer(scrollContainer: ElementRef) {
    this._scrollContainer = scrollContainer;
    if (this._scrollContainer?.nativeElement) {
      this._scrollListener = this._renderer.listen(
        this._scrollContainer.nativeElement,
        'scroll',
        () => {
          this.showScroll =
            this._scrollContainer.nativeElement.scrollTop > this.threshold;
        }
      );
    }
  }

  constructor(private _renderer: Renderer2) {}

  public ngOnDestroy() {
    if (this._scrollListener) {
      this._scrollListener();
    }
  }

  public scrollToTop() {
    if (this._scrollContainer && this._scrollContainer.nativeElement) {
      this._scrollContainer.nativeElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
