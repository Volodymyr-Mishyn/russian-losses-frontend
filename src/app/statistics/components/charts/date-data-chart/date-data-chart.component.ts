import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BaseChartDirective } from '../base-chart.directive';
import { PlatformService } from '../../../../services/platform.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { groupBy, mean } from 'lodash';
import { Subject, takeUntil } from 'rxjs';
import 'chartjs-adapter-date-fns';

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
  ],
  templateUrl: './date-data-chart.component.html',
  styleUrl: './date-data-chart.component.scss',
})
export class DateDataChartComponent
  extends BaseChartDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  private _destroy$ = new Subject();

  public form: FormGroup;

  @Input()
  public title!: string;

  @Input()
  public type!: string;

  @Input()
  public data: Array<DateDataItem> = [];

  constructor(platformService: PlatformService, private _fb: FormBuilder) {
    super(platformService);
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
      this.chart.data.datasets[0].backgroundColor = data.map(() => 'teal');
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

  private async _createChart(): Promise<void> {
    try {
      const [chartModule, zoomPlugin, localeModule] = await Promise.all([
        import('chart.js/auto'),
        import('chartjs-plugin-zoom'),
        import('date-fns/locale'),
      ]);
      const uk = localeModule.uk;
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
                backgroundColor: 'teal',
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                adapters: {
                  date: {
                    locale: uk,
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

  public async ngAfterViewInit(): Promise<void> {
    if (!this.platformService.isRunningOnBrowser()) {
      return;
    }
    await this._createChart();
  }

  public override ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
    super.ngOnDestroy();
  }
}
