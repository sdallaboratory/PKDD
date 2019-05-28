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
import { ResultProcessorService } from '../../models/services/result-processor.service';
import { TechMmpiService } from '../../models/services/tech-mmpi.service';
import { TotalPlot } from '../../models/total-plot';
import { ReductionStrategies } from '../../models/reduction-strategies';
import { MmpiPlot } from '../../models/mmpi-plot';
import { MmpiScalePipe } from 'src/app/core/pipes/mmpi-scale.pipe';

@Component({
  selector: 'pkdd-tech-mmpi',
  templateUrl: './tech-mmpi.component.html',
  styleUrls: ['./tech-mmpi.component.scss'],
  providers: [RealtimeResultService, TechMmpiService]
})
export class TechMmpiComponent implements OnInit, OnDestroy {

  public person: Person;
  public emitter: ResultEmitter;
  public chartConfig: PkddChartConfiguration;
  private loaded: boolean = null;
  constructor(
    // private readonly route: RouteDataProviderService
    private readonly realtime: RealtimeResultService,
    private readonly route: ActivatedRoute,
    public readonly window: WindowService,
    private readonly env: EnvironmentService,
    private readonly processor: ResultProcessorService,
    public readonly plots: TechMmpiService,
    private readonly scaleName: MmpiScalePipe,
  ) { }



  ngOnInit() {
    // this.person = (await this.route.get<PersonResolverModel>('personModel')).person;
    this.person = this.route.snapshot.data['personModel'].person;
    this.emitter = this.realtime.getEmitter(this.person.id);
    this.emitter.changed.subscribe(this.changedHandler);
    this.emitter.start();
    this.plots.settingsChanged.subscribe(this.changedHandler);
  }

  private readonly changedHandler = (results: TestResult[]) => {
    if (!this.chartConfig && !this.loaded) {
      this.loaded = true;
      this.initChartConfig();
    }
    this.updateChart();
  }

  public ngOnDestroy() {
    this.emitter.stop();
  }

  initChartConfig() {
    this.chartConfig = {
      type: 'line',
      data: {
        labels: MmpiResult.keys.map(k => this.scaleName.transform(k)),
        datasets: []
      },
      options: {
        bezierCurve: false,
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

  private updateChart() {
    if (!this.chartConfig) {
      return;
    }
    this.chartConfig.data.datasets = this.plots.getDatasets(this.emitter.results);
    if (this.chartConfig.update) {
      this.chartConfig.update();
    }
  }

  public onPlotCreated(plot: MmpiPlot) {
    this.plots.add(plot);
    this.updateChart();
  }

  public onPlotDeleted(plot: MmpiPlot) {
    this.plots.remove(plot);
    this.updateChart();
  }
}
