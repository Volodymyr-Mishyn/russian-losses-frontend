import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { BaseChartDirective } from '../base-chart.directive';
import { ChartData } from '../_models/chart-data';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-number-data-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-data-chart.component.html',
  styleUrl: './number-data-chart.component.scss',
})
export class NumberDataChartComponent
  extends BaseChartDirective
  implements AfterViewInit, OnDestroy
{
  @Input()
  public title!: string;

  @Input()
  public data: Array<ChartData> = [];

  @Input()
  public color: string | null = null;

  protected override updateChart(): void {
    this.chart.data.labels = this.data.map((element) => element.name);
    const data = this.data.map((entry) => entry.value);
    this.chart.data.datasets[0].data = data;
    if (this.color) {
      this.chart.data.datasets[0].backgroundColor = this.color;
    }
    this.chart.update();
  }

  protected async createChart(): Promise<void> {
    try {
      if (!this.chartCanvas) {
        return;
      }
      const chartModule = await import('chart.js/auto');
      const Chart = chartModule.default;
      const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [],
            datasets: [
              {
                data: [],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: `${this.title}`,
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
}
