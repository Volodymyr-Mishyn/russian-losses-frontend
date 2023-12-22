import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { BaseChartDirective } from '../base-chart.directive';
import { ChartData } from '../_models/chart-data';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-multiple-datasets-data-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiple-datasets-data-chart.component.html',
  styleUrl: './multiple-datasets-data-chart.component.scss',
})
export class MultipleDatasetsDataChartComponent
  extends BaseChartDirective
  implements AfterViewInit
{
  @Input()
  public title!: string;

  @Input()
  public labels: Array<string> = [];
  @Input()
  public data: Array<{ label: string; data: Array<ChartData> }> = [];

  @Input() customColors: { [k: string]: string } | null = null;

  protected override updateChart(): void {
    this.chart.data.labels = this.labels;
    this.data.forEach(({ data, label }, index) => {
      this.chart.data.datasets[index] = {
        label,
        data: this.labels.map(
          (label) =>
            data.find((singleData) => singleData.name === label)?.value || 0
        ),
        ...(this.customColors != null &&
          this.customColors[label] && {
            backgroundColor: this.customColors[label],
          }),
      };
    });
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
            datasets: [],
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
