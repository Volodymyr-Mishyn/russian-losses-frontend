import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseChartDirective } from '../base-chart.directive';
import { PlatformService } from '../../../../services/platform.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { groupBy, mean } from 'lodash';
import { Subject, firstValueFrom, take, takeUntil } from 'rxjs';
import 'chartjs-adapter-date-fns';
import { MatIconModule } from '@angular/material/icon';
import { DateFnsLocaleService } from '../../../services/date-fns-locale.service';
import { ThemeService } from '../../../../services/theme.service';

export interface DateDataItem {
  date: string;
  value: number;
  diffWithAverage?: number;
}

@Component({
  selector: 'app-date-data-chart',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  templateUrl: './date-data-chart.component.html',
  styleUrl: './date-data-chart.component.scss',
})
export class DateDataChartComponent
  extends BaseChartDirective
  implements OnInit, OnDestroy
{
  private _destroy$ = new Subject();

  public form: FormGroup;

  @Input()
  public title!: string;

  @Input()
  public type!: string;

  @Input()
  public showLegend = true;

  @Input()
  public iconName: string | null = null;

  @Input()
  public data: Array<DateDataItem> = [];

  @Input()
  public customColor: string | null = null;

  constructor(
    platformService: PlatformService,
    themeService: ThemeService,
    private _fb: FormBuilder,
    private _dateFnsLocaleService: DateFnsLocaleService
  ) {
    super(platformService, themeService);
    this.form = this._fb.group({
      gradationMode: ['daily'],
      showDeviateFromAverage: [false],
    });
  }

  private _createMonthBaseDate(date: Date): Date {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
      0,
      0,
      0,
      0
    );
    return newDate;
  }

  private _groupByMonth(data: Array<DateDataItem>): {
    [key: string]: Array<DateDataItem>;
  } {
    return groupBy(data, (item) => {
      const date = new Date(item.date);
      const newDate = this._createMonthBaseDate(date);
      return newDate.toISOString();
    });
  }

  private _modifyChartColorsByData(data: Array<number>): void {
    const showDeviateFromAverage = this.form.get(
      'showDeviateFromAverage'
    )?.value;
    if (showDeviateFromAverage) {
      const average = mean(data);
      this.chart.data.datasets[0].backgroundColor = data.map((entry) =>
        entry > average ? 'green' : 'red'
      );
    } else {
      this.chart.data.datasets[0].backgroundColor = data.map(() =>
        this.customColor ? this.customColor : 'teal'
      );
    }
  }

  private _modifyChartForDaily(): void {
    this.chart.data.labels = this.data.map((entry) => entry.date);
    const data = this.data.map((entry) => entry.value);
    this.chart.data.datasets[0].data = data;
    this._modifyChartColorsByData(data);
    this.chart.options.scales.x.time.unit = 'day';
  }

  private _modifyChartForMonthly(): void {
    const monthlyData = this._groupByMonth(this.data);
    this.chart.data.labels = Object.keys(monthlyData);
    const data = Object.values(monthlyData).map((month) =>
      month.reduce((sum, item) => sum + item.value, 0)
    );
    this.chart.data.datasets[0].data = data;
    this._modifyChartColorsByData(data);
    this.chart.options.scales.x.time.unit = 'month';
  }

  private _modifyGradationMode(): void {
    const gradationMode = this.form.get('gradationMode')?.value;
    if (gradationMode === 'daily') {
      this._modifyChartForDaily();
    } else {
      this._modifyChartForMonthly();
    }
  }

  protected async createChart(): Promise<void> {
    try {
      const [chartModule, zoomPlugin] = await Promise.all([
        import('chart.js/auto'),
        import('chartjs-plugin-zoom'),
      ]);
      const locale = this._dateFnsLocaleService.getLocale();
      const Chart = chartModule.default;
      Chart.register(zoomPlugin.default);
      if (!this.chartCanvas) {
        return;
      }
      const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [],
            datasets: [
              {
                label: `${this.title} ${this.type}`,
                data: [],
                borderColor: 'blue',
                backgroundColor: this.customColor ? this.customColor : 'teal',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                adapters: {
                  date: {
                    locale: locale,
                  },
                },
              },
              y: {
                ticks: {
                  precision: 0,
                },
                type: 'linear',
              },
            },
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: this.showLegend,
              },
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                    modifierKey: 'ctrl',
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: 'x',
                  onZoomComplete({ chart }) {
                    chart.update('none');
                  },
                },
                limits: {
                  x: { min: 'original', max: 'original' },
                },
                pan: {
                  enabled: true,
                  mode: 'x',
                },
              },
            },
          },
        });
        const theme = await firstValueFrom(
          this.themeService.theme$.pipe(take(1))
        );
        this.updateChartTheme(theme);
        this.updateChart();
      }
    } catch (error) {
      console.error('Error loading Chart.js dependencies:', error);
    }
  }

  protected updateChart(): void {
    this._modifyGradationMode();
    this.chart.update();
  }

  public ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.updateChart();
    });
  }

  public override ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
    super.ngOnDestroy();
  }
}
