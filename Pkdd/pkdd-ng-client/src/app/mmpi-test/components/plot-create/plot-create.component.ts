import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MmpiPlot } from '../../models/mmpi-plot';
import { ResultEmitter } from 'src/app/test/services/realtime-result.service';
import { PkddUser } from 'src/app/models/auth/pkdd-user';
import { IndividualPlot } from '../../models/individual-plot';
import { TotalPlot } from '../../models/total-plot';
import { ReductionStrategies } from '../../models/reduction-strategies';

@Component({
  selector: 'pkdd-plot-create',
  templateUrl: './plot-create.component.html',
  styleUrls: ['./plot-create.component.scss']
})
export class PlotCreateComponent implements OnInit {

  @Output()
  public readonly created: EventEmitter<MmpiPlot> = new EventEmitter();

  @Input()
  public readonly emitter: ResultEmitter;

  public type: 'individual' | 'total';

  public selectedExpert: PkddUser;


  public colors = [
    '#000000',
    '#00000022',
    '#9C27B0CC',
    '#3F51B5CC',
    '#03A9F4CC',
    '#009688CC',
    '#8BC34ACC',
    '#FFC107CC',
    '#d50000CC',
  ];

  // TODO: set adequate initial value
  public selectedStrategy: ReductionStrategies = ReductionStrategies.average;

  public selectedColor = this.colors[0];

  public borderWidth = 3;

  public percent = 80;

  public formatPercent = (value: number) => value + '%';

  public formatPx = (value: number) => value + 'px';

  public get strategies(): ReductionStrategies[] {
    return Object.values(ReductionStrategies);
  }

  private results;

  constructor() { }

  public get mmpiExperts(): PkddUser[] {
    if ((!this.results || !this.results.length) && this.emitter) {
      this.results = this.emitter.results;
    }
    return this.results && this.results.filter(r => r.mmpiComplete).map(r => r.userInfo);
  }

  ngOnInit() {
    // TODO: Bring out  logic of creating initial plot from the component
    this.buildInitialPlots();
  }

  private buildInitialPlots() {
    this.buildAllPlot();
    this.buildMaxPlot();
    this.buildMinPlot();
    this.buildAveragePlot();
  }

  private buildAveragePlot() {
    const plot = new TotalPlot(ReductionStrategies.average, 80);
    plot.borderWidth = 3;
    plot.color = this.colors[0];
    this.created.emit(plot);
  }

  private buildMaxPlot() {
    const plot = new TotalPlot(ReductionStrategies.max, 80);
    plot.borderWidth = 2;
    plot.color = this.colors[4];
    this.created.emit(plot);
  }

  private buildMinPlot() {
    const plot = new TotalPlot(ReductionStrategies.min, 80);
    plot.borderWidth = 2;
    plot.color = this.colors[5];
    this.created.emit(plot);
  }

  private buildAllPlot() {
    const plot = new TotalPlot(ReductionStrategies.all, 80);
    plot.borderWidth = 1;
    plot.color = this.colors[1];
    this.created.emit(plot);
  }

  public onBuild() {
    let plot: MmpiPlot;
    if (this.type === 'individual') {
      plot = new IndividualPlot(this.selectedExpert);
    } else if (this.type === 'total') {
      plot = new TotalPlot(this.selectedStrategy, this.percent);
    }
    plot.borderWidth = this.borderWidth;
    plot.color = this.selectedColor;
    this.created.emit(plot);
    this.type = null;
  }

  public onCancel() {
    this.type = null;
  }

  public get isValid() {
    const preCheck = this.selectedColor && this.borderWidth;
    if (this.type === 'individual') {
      return preCheck && this.selectedExpert;
    } else if (this.type === 'total') {
      return preCheck && this.selectedStrategy && this.percent;
    }
  }

  public onExpertSelectOpenedChanged(opened: boolean = true) {
    if (opened) {
      console.log(opened);
      this.results = this.emitter.results;
    }
  }
}
