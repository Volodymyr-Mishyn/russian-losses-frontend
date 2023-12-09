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
import chroma from 'chroma-js';
import { ChartData } from '../_models/chart-data';

const DISTINGUISHABLE_COLORS = chroma.scale('Set3').colors(20);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent
  extends BaseChartDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input()
  public title!: string;

  @Input()
  public data: Array<ChartData> = [];

  @Input() customColors: { [k: string]: string } | null = null;

  constructor(platformService: PlatformService) {
    super(platformService);
  }

  protected override updateChart(): void {
    this.chart.data.labels = this.data.map((element) => element.name);
    const data = this.data.map((entry) => entry.value);
    this.chart.data.datasets[0].data = data;
    if (this.customColors !== null) {
      const customColors: { [k: string]: string } = this.customColors;
      const colors = this.data.map((value) => customColors[value.name]);
      this.chart.data.datasets[0].backgroundColor = colors;
    }
    this.chart.update();
  }

  private async _createChart(): Promise<void> {
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
          type: 'pie',
          data: {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: DISTINGUISHABLE_COLORS,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `${this.title}`,
              },
              colors: {
                enabled: false,
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

  public ngOnInit(): void {}

  public async ngAfterViewInit(): Promise<void> {
    if (!this.platformService.isRunningOnBrowser()) {
      return;
    }
    await this._createChart();
  }
}
