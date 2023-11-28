import { Directive, ElementRef, ViewChild } from '@angular/core';
import { PlatformService } from '../../../services/platform.service';

@Directive({
  selector: '[appBaseChart]',
  standalone: true,
})
export abstract class BaseChartDirective {
  protected chart!: any;
  @ViewChild('chartCanvas') protected chartCanvas!: ElementRef;
  constructor(public platformService: PlatformService) {}

  protected abstract updateChart(): void;

  public ngOnChanges(): void {
    if (!this.platformService.isRunningOnBrowser()) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.updateChart();
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
