import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { EntityLossFlat } from '../../../../_models/data/mod/mod-model';

@Directive({
  selector: '[appCasualtyComparison]',
  standalone: true,
})
export class CasualtyComparisonDirective {
  @Input()
  public entityLoss!: EntityLossFlat;

  @Input()
  public threshold: number = 2;

  @Input()
  public height: number = 8;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (!this.entityLoss.calculatedIncrement) {
      return;
    }
    this._drawDeviationLine2(
      this.entityLoss?.calculatedIncrement.comparedToAverage
    );
  }

  private _calculateGreenWidth(comparedToAverage: number): number {
    if (comparedToAverage >= this.threshold) {
      return 1;
    } else if (comparedToAverage > 1) {
      return +(comparedToAverage / this.threshold).toFixed(1);
    } else {
      return 0;
    }
  }

  private _calculateRedWidth(comparedToAverage: number): number {
    const limit = 1 / this.threshold;
    if (comparedToAverage <= limit) {
      return 1;
    } else {
      return +(limit / comparedToAverage).toFixed(1);
    }
  }

  private _createSegment(flex: number, backgroundColor: string) {
    const segment = this.renderer.createElement('div');
    this.renderer.setStyle(segment, 'flex', flex);
    this.renderer.setStyle(segment, 'height', '100%');
    this.renderer.setStyle(segment, 'display', 'flex');
    this.renderer.setStyle(segment, 'background-color', backgroundColor);
    return segment;
  }

  private _drawDeviationLine2(comparedToAverage: number) {
    const line = this.renderer.createElement('div');
    this.renderer.setStyle(line, 'width', '100%');
    this.renderer.setStyle(line, 'height', `${this.height}px`);
    this.renderer.setStyle(line, 'display', 'flex');
    this.renderer.setStyle(line, 'border', '1px solid black');
    const separator = this.renderer.createElement('div');
    this.renderer.setStyle(separator, 'width', '2px');
    this.renderer.setStyle(separator, 'height', '100%');
    this.renderer.setStyle(separator, 'background-color', 'black');
    const redPart = this._createSegment(0.5, 'transparent');
    this.renderer.setStyle(redPart, 'flex-direction', 'row-reverse');
    const greenPart = this._createSegment(0.5, 'transparent');
    this.renderer.setStyle(greenPart, 'flex-direction', 'row');
    this.renderer.appendChild(line, redPart);
    this.renderer.appendChild(line, separator);
    this.renderer.appendChild(line, greenPart);
    if (comparedToAverage > 1) {
      const greenActualWidth = this._calculateGreenWidth(comparedToAverage);
      const actualGreen = this._createSegment(greenActualWidth, 'green');
      this.renderer.appendChild(greenPart, actualGreen);
    } else if (comparedToAverage < 1) {
      const redActualWidth = this._calculateRedWidth(comparedToAverage);
      const actualRed = this._createSegment(redActualWidth, 'red');
      this.renderer.appendChild(redPart, actualRed);
    } else {
      this.renderer.setStyle(line, 'background-color', 'transparent');
    }
    this.renderer.appendChild(this.el.nativeElement, line);
  }
}
