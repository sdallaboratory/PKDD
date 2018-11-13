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

  // TODO: set adequate initial value
  public selectedStrategy: ReductionStrategies = ReductionStrategies.average;

  public selectedColor: string;

  public borderWidth = 3;

  public percent = 80;

  public formatPercent = (value: number) => value + '%';

  public formatPx = (value: number) => value + 'px';

  public get strategies(): ReductionStrategies[] {
    return Object.values(ReductionStrategies);
  }

  public colors = [
    '#9C27B0',
    '#3F51B5',
    '#03A9F4',
    '#009688',
    '#8BC34A',
    '#FFC107',
    // '#FF5722',
    // '#616161',
    // '#607D8B',
    '#d50000'
  ];

  // TODO: delete this shit and getdata directly from emitter. It should intantiate its results array only once.
  private results;

  constructor() { }

  public get mmpiExperts(): PkddUser[] {
    if (!this.results && this.emitter) {
      this.results = this.emitter.results;
    }
    // return this.emitter && this.emitter.results.filter(r => r.mmpiComplete).map(r => r.userInfo);
    return this.results && this.results.filter(r => r.mmpiComplete).map(r => r.userInfo);
  }

  ngOnInit() {
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
}
