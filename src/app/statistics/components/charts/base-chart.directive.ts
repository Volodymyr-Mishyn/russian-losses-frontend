import { Directive, ElementRef, ViewChild } from '@angular/core';
import { PlatformService } from '../../../services/platform.service';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';
import { Theme } from '../../../_constants/themes';

@Directive({
  selector: '[appBaseChart]',
  standalone: true,
})
export abstract class BaseChartDirective {
  private _themeSubscription!: Subscription;
  protected chart!: any;
  @ViewChild('chartCanvas') protected chartCanvas!: ElementRef;
  constructor(
    public platformService: PlatformService,
    public themeService: ThemeService
  ) {}

  protected abstract updateChart(): void;
  protected abstract createChart(): Promise<void>;
  protected async updateChartTheme(
    theme: Theme,
    update = false
  ): Promise<void> {
    if (!this.chart) {
      return;
    }
    if (this.chart.options) {
      const color = theme === 'dark' ? 'lightgrey' : 'grey';
      if (this.chart.options.plugins.legend.labels) {
        this.chart.options.plugins.legend.labels.color = color;
      }
      if (this.chart.options.plugins.title) {
        this.chart.options.plugins.title.color = color;
      }
      if (this.chart.options.scales.x && this.chart.options.scales.y) {
        this.chart.options.scales.x.ticks.color = color;
        this.chart.options.scales.y.ticks.color = color;
        this.chart.options.scales.x.title.color = color;
        this.chart.options.scales.y.title.color = color;
      }
      if (update) {
        this.chart.update();
      }
    }
  }

  public ngOnChanges(): void {
    if (!this.platformService.isRunningOnBrowser()) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.updateChart();
  }

  public async ngAfterViewInit(): Promise<void> {
    if (!this.platformService.isRunningOnBrowser()) {
      return;
    }
    this._themeSubscription = this.themeService.theme$.subscribe((theme) => {
      this.updateChartTheme(theme, true);
    });
    await this.createChart();
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this._themeSubscription?.unsubscribe) {
      this._themeSubscription.unsubscribe();
    }
  }
}
