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
  // private plot: IndividualPlot | TotalPlot;

  // TODO: set adequate initial value
  public selectedStrategy: ReductionStrategies = ReductionStrategies.average;

  public color: string;

  public percent = 80;

  public formatLabel = (value: number) => value + '%';

  public get strategies(): ReductionStrategies[] {
    return Object.values(ReductionStrategies);
  }

  constructor() { }

  // TODO: delete this shit and getdata directly from emitter. It should intantiate its results array only once.
  private results;

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
    if (this.type === 'individual') {
      const plot = new IndividualPlot(this.selectedExpert);
      this.created.emit(plot);
    } else if (this.type === 'total') {
      const plot = new TotalPlot(this.selectedStrategy);
      this.created.emit(plot);
    }
  }
  onColor() {
    console.log(this.color);
    
  }
}
