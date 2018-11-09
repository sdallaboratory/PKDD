import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeResultService, ResultEmitter } from 'src/app/test/services/realtime-result.service';
import { PersonResolverModel } from 'src/app/persons/resolvers/resolvers-models/person-resolver-model';
import { RouteDataProviderService } from 'src/app/core/services/route-data-provider.service';
import { Person } from 'src/app/models/entities/person';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { WindowService } from 'src/app/core/services/window.service';
import { ChartConfiguration } from 'chart.js';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { EnvironmentService } from 'src/app/core/services/environment.service';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { PkddChartConfiguration } from 'src/app/pkdd-charts/models/config';
import { ResultProcessorService } from '../../services/result-processor.service';

@Component({
  selector: 'pkdd-tech-mmpi',
  templateUrl: './tech-mmpi.component.html',
  styleUrls: ['./tech-mmpi.component.scss'],
  providers: [RealtimeResultService, RouteDataProviderService]
})
export class TechMmpiComponent implements OnInit, OnDestroy {

  public person: Person;
  private emitter: ResultEmitter;
  public chartConfig: PkddChartConfiguration;

  constructor(
    private readonly realtime: RealtimeResultService,
    // private readonly route: RouteDataProviderService
    private readonly route: ActivatedRoute,
    public readonly window: WindowService,
    private readonly env: EnvironmentService,
    private readonly processor: ResultProcessorService
  ) { }

  async ngOnInit() {
    // this.person = (await this.route.get<PersonResolverModel>('personModel')).person;
    this.person = (await this.route.data.pipe(first()).toPromise())['personModel'].person;
    this.emitter = this.realtime.getEmitter(this.person.id).start();

    this.emitter.onChanged.subscribe(((results: TestResult[]) => {
      // if (!this.chartConfig) {
      //   this.initChart();
      // }
      // for (let i = 0; i < MmpiResult.keys.length; i++) {
      //   this.chartConfig.data.datasets[0].data[i] = MmpiResult.toArray(results[0].mmpi)[i];
      // }
      // console.log('updating', this.chartConfig);

      // if (this.chartConfig.update) {
      //   this.chartConfig.update();
      // }
      console.log(MmpiResult.toArray(this.processor.average(this.emitter.results./*filter(r => r.mmpiComplete).*/map(r => r.mmpi))));
      this.initChart();
    }));
  }

  public ngOnDestroy() {
    this.emitter.stop();
  }

  initChart() {
    this.chartConfig = {
      type: 'line',
      data: {
        labels: MmpiResult.keys,
        datasets: [
          {
          label: 'Среднее арифметическое',
          data: MmpiResult.toArray(this.processor.average(this.emitter.results./*filter(r => r.mmpiComplete).*/map(r => r.mmpi))),
          borderWidth: 6,
          pointRadius: 4,
          // pointHoverRadius: 20,
          fill: false,
          backgroundColor: 'purple',
          borderColor: 'purple',
          // pointHoverBackgroundColor: 'yellow',
          // pointHoverBorderWidth: 1
        },
        {
          label: 'Среднее квадратическое',
          data: MmpiResult.toArray(this.processor.root(this.emitter.results./*filter(r => r.mmpiComplete).*/map(r => r.mmpi))),
          borderWidth: 6,
          pointRadius: 4,
          fill: false,
          backgroundColor: 'gray',
          borderColor: 'gray',
        }
      ]
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
                max: this.env.config.mmpiResultMaxValue
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: false
              }
            }
          ]
        },
        responsive: true,
        animation: { duration: 0 }
      },
    };
  }

}
