import { Component, OnInit } from '@angular/core';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { TestResult } from '../../../models/persons/results/test-result';
import { ResultsProviderService } from 'src/app/test/services/results-provider.service';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { EnvironmentService } from 'src/app/core/services/environment.service';
import { PkddChartConfiguration } from 'src/app/pkdd-charts/models/config';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { NotificatorService } from 'src/app/notification/services/notificator.service';
import { MmpiScalePipe } from 'src/app/core/pipes/mmpi-scale.pipe';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';

@Component({
  selector: 'pkdd-person-mmpi',
  templateUrl: './person-mmpi.component.html',
  styleUrls: ['./person-mmpi.component.scss'],
  providers: [RouteDataProviderService]
})
export class PersonMmpiComponent implements OnInit {

  public result: TestResult;

  public chartConfig: PkddChartConfiguration;

  public get scales() {
    if (!this.result) {
      return null;
    }
    return MmpiResult.toNameValuePairs(this.result.mmpi);
  }

  public get keys() {
    return MmpiResult.keys;
  }

  constructor(
    private readonly data: RouteDataProviderService,
    private readonly provider: ResultsProviderService,
    private readonly env: EnvironmentService,
    private readonly confirmer: ConfirmService,
    private readonly notificator: NotificatorService,
    private readonly scaleName: MmpiScalePipe,
    private readonly truncate: TruncatePipe
  ) { }

  async ngOnInit() {
    this.result = await this.data.get<TestResult>('results');
    console.log(this.result);
    this.initChart();
  }

  initChart() {
    this.chartConfig = <PkddChartConfiguration>{
      type: 'line',
      data: {
        labels: MmpiResult.keys.map(k => this.scaleName.transform(k))
          .map(k => this.truncate.transform(k, 13, false)),
        datasets: [{
          data: MmpiResult.toArray(this.result.mmpi),
          borderWidth: 6,
          pointRadius: 8,
          pointHoverRadius: 20,
          fill: false,
          backgroundColor: 'purple',
          borderColor: 'purple',
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderWidth: 3
        }]
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: 15
        },
        legend: {
          display: false,
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
        plugins: {
          dragData: true,
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
      dragData: true,
      dragDataRound: 0,
      onDragStart: (e) => {
        document.querySelector<HTMLDivElement>('.mat-drawer-content').style.overflow = 'hidden';
        e.stopPropagation();
        document.querySelector<HTMLDivElement>('.mat-drawer-content').ontouchmove = (event) => {
          event.stopPropagation();
          event.preventDefault();
        };
      },
      onDragEnd: () => {
        document.querySelector<HTMLDivElement>('.mat-drawer-content').style.overflow = 'auto';
        this.updateValues();
      },
      onDrag: () => { }
    };

  }

  private updateValues() {
    if (!this.chartConfig.data || !this.chartConfig.data.datasets) {
      return;
    }
    const data = this.chartConfig.data.datasets[0].data as number[];
    data.forEach((val, i) => {
      data[i] = +val.toFixed(0);
    });
    MmpiResult.keys.forEach((key, i) => {
      this.result.mmpi[key] = data[i];
      this.ensureValid(key);
    });
  }

  public async onSave() {
    this.result.mmpiComplete = true;
    this.result = await this.provider.send(this.result);
    this.notificator.success('Ваша оценка успешно сохранена');
  }

  onValueCahnged(key: string) {
    this.ensureValid(key);
    this.chartConfig.data.datasets[0].data = MmpiResult.toArray(this.result.mmpi);
    if (this.chartConfig.update) {
      this.chartConfig.update();
    }
  }

  ensureValid(key: string) {
    const value = this.result.mmpi[key];
    this.result.mmpi[key] = Math.round(Math.min(this.env.config.mmpiResultMaxValue, Math.max(0, value)));
  }

  public async onDelete() {
    const confirmed = await this.confirmer.confirm('Ваша оценка будет удалена из базы данных. Продолжить?');
    if (confirmed) {
      this.result.mmpiComplete = false;
      this.result = await this.provider.send(this.result);
    }

  }
}
