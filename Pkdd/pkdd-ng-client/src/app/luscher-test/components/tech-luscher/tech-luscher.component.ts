import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { PkddChartConfiguration } from 'src/app/pkdd-charts/models/config';
import { LuscherColorPipe } from 'src/app/core/pipes/luscher-color.pipe';
import { colors, colorsNames } from '../../data/colors';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { MmpiScalePipe } from 'src/app/core/pipes/mmpi-scale.pipe';
import { EnvironmentService } from 'src/app/core/services/environment.service';
import { LuscherResultProcessorService } from '../../services/luscher-result-processor.service';

@Component({
  selector: 'pkdd-tech-luscher',
  templateUrl: './tech-luscher.component.html',
  styleUrls: ['./tech-luscher.component.scss']
})
export class TechLuscherComponent implements OnInit, OnChanges {

  @Input()
  public results: TestResult[];

  public chartConfig: PkddChartConfiguration;

  constructor(
    private readonly color: LuscherColorPipe,
    private readonly processor: LuscherResultProcessorService,
  ) { }

  public ngOnInit() {
    this.initChartConfig();
  }

  public ngOnChanges() {
    if (!this.results || !this.chartConfig) {
      return;
    }
    if (!this.chartConfig.data.datasets[0]) {
      this.chartConfig.data.datasets[0] = this.makeAverageData();
    } else {
      const newAverage = this.makeAverageData().data;
      newAverage.forEach((val, i) => {
        this.chartConfig.data.datasets[0].data[i] = val;
      });
    }
    if (this.chartConfig.update) {
      this.chartConfig.update();
    }
  }

  private makeAverageData() {
    const average = this.processor.getAverage(this.results.filter(r => r.luscherComplete).map(r => r.luscher));
    return {
      backgroundColor: Object.values(colors),
      data: colorsNames.map(c => average[c]).map(v => v * 100)
    };
  }

  private initChartConfig() {

    this.chartConfig = {
      type: 'bar',
      data: {
        labels: colorsNames.map(c => this.color.transform(c)),
        datasets: this.results ? [this.makeAverageData()] : [],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Значения цветовых профилей (в процентах %)'
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 15
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: false,
                maxRotation: 75,
                minRotation: 75
              }
            }
          ]
        },
        annotation: {
          annotations: [{
            drawTime: 'beforeDatasetsDraw',
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 50,
            borderColor: 'black',
            borderWidth: 1,
            label: {
              enabled: true,
              content: '50'
            }
          }]
        }
      } as PkddChartConfiguration
    };
  }

}
