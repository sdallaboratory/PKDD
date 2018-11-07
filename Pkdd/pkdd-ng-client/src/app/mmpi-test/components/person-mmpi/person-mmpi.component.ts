import { Component, OnInit } from '@angular/core';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { TestResult } from '../../../models/persons/results/test-result';
import { ResultsProviderService } from 'src/app/test/services/results-provider.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChartConfiguration, ChartData } from 'chart.js';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';

@Component({
  selector: 'pkdd-person-mmpi',
  templateUrl: './person-mmpi.component.html',
  styleUrls: ['./person-mmpi.component.scss'],
  providers: [RouteDataProviderService]
})
export class PersonMmpiComponent implements OnInit {

  public result: TestResult;

  public chartConfig: ChartConfiguration;

  public get scales() {
    return this.result && Object.keys(this.result.mmpi).map(key => ({ name: key, value: this.result.mmpi[key] }));
  }

  private get keys() {
    return Object.keys(new MmpiResult());
  }

  constructor(
    private readonly data: RouteDataProviderService,
    private readonly provider: ResultsProviderService
  ) { }

  async ngOnInit() {
    this.result = await this.data.get<TestResult>('results');
    console.log(this.result);
    this.initChart();
  }

  initChart() {
    this.chartConfig = {
      type: 'line',
      data: {
        labels: this.keys,
        datasets: [{
          data: this.scales.map(scale => scale.value),
          borderWidth: 6,
          pointRadius: 10,
          pointHoverRadius: 15,
          fill: false,
          backgroundColor: 'purple',
          borderColor: 'purple',
          pointHoverBackgroundColor: 'yellow'
        }]
      },
      options: {
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
          ]
        },
        plugins: {
          dragData: true,
        },
        responsive: true,
      },
    };
    (<any>this.chartConfig.options).dragData = true;
    (<any>this.chartConfig.options).onDragEnd = () => this.updateValues();
  }

  private updateValues() {
    const data = this.chartConfig.data.datasets[0].data as number[];
    data.forEach((val, i) => {
      data[i] = +val.toFixed(0);
    });
    this.keys.forEach((key, i) => {
      this.result.mmpi[key] = data[i];
    });
  }

  public onSave() {
    try {
      this.provider.send(this.result);
    } catch { }
  }

}
