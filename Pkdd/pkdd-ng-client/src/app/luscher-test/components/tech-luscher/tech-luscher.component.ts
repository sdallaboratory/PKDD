import { Component, OnInit, Input } from '@angular/core';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { PkddChartConfiguration } from 'src/app/pkdd-charts/models/config';
import { LuscherColorPipe } from 'src/app/core/pipes/luscher-color.pipe';
import { colors } from '../../data/colors';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { MmpiScalePipe } from 'src/app/core/pipes/mmpi-scale.pipe';
import { EnvironmentService } from 'src/app/core/services/environment.service';

@Component({
  selector: 'pkdd-tech-luscher',
  templateUrl: './tech-luscher.component.html',
  styleUrls: ['./tech-luscher.component.scss']
})
export class TechLuscherComponent implements OnInit {

  @Input()
  public results: TestResult[];

  public chartConfig: PkddChartConfiguration;

  constructor(
    private readonly color: LuscherColorPipe,
    private readonly scaleName: MmpiScalePipe,
    private readonly env: EnvironmentService
  ) { }

  ngOnInit() {
    this.initChartConfig();

    console.log(this.chartConfig);
  }

  // ngOnChange() {
  //   this.chartConfig.data.datasets.push({
  //     label: 'Dataset 1',
  //     backgroundColor: 'red',
  //     borderWidth: 1,
  //     data: [
  //       0, 1, 2, 3, 4, 5, 6, 7
  //     ],
  //   });
  // }

  initChartConfig() {
    this.chartConfig = {
      type: 'line',
      data: {
        labels: MmpiResult.keys.map(k => this.scaleName.transform(k)),
        datasets: [
          {
            label: 'Среднее арифметическое',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //  MmpiResult.toArray(this.processor.median(this.emitter.results./*filter(r => r.mmpiComplete).*/map(r => r.mmpi))),
            borderWidth: 6,
            pointRadius: 4,
            fill: false,
            backgroundColor: 'purple',
            borderColor: 'purple',
          },
          {
            label: 'Среднее квадратическое',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            borderWidth: 6,
            pointRadius: 4,
            fill: false,
            backgroundColor: 'gray',
            borderColor: 'gray',
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        layout: {
          padding: 15
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: this.env.config.mmpiResultMaxValue
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
        responsive: true,
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
      },
    } as PkddChartConfiguration;
  }

}
