import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { BaseChartDirective } from '../base-chart.directive';
import { PlatformService } from '../../../../services/platform.service';
import 'chartjs-adapter-date-fns';

export interface DateDataItem {
  date: string;
  value: number;
  diffWithAverage?: number;
}

@Component({
  selector: 'app-date-data-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-data-chart.component.html',
  styleUrl: './date-data-chart.component.scss',
})
export class DateDataChartComponent
  extends BaseChartDirective
  implements AfterViewInit
{
  @Input()
  public title!: string;

  @Input()
  public data: Array<DateDataItem> = [];

  constructor(platformService: PlatformService) {
    super(platformService);
  }

  protected updateChart() {
    this.chart.data.labels = this.data.map((entry) => entry.date);
    this.chart.data.datasets[0].data = this.data.map((entry) => entry.value);
    this.chart.update();
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.platformService.isRunningOnBrowser()) {
      return;
    }
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
            labels: this.data.map((entry) => entry.date),
            datasets: [
              {
                label: `${this.title} Increment`,
                data: this.data.map((entry) => entry.value),
                borderColor: 'blue',
                backgroundColor: 'red',
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
            },
            plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
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
      }
    } catch (error) {
      console.error('Error loading Chart.js dependencies:', error);
    }
  }
}
