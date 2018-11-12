import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MmpiPlot } from '../../models/mmpi-plot';
import { ResultEmitter } from 'src/app/test/services/realtime-result.service';
import { PkddUser } from 'src/app/models/auth/pkdd-user';

@Component({
  selector: 'pkdd-plot-create',
  templateUrl: './plot-create.component.html',
  styleUrls: ['./plot-create.component.scss']
})
export class PlotCreateComponent implements OnInit {

  @Output()
  public readonly created: EventEmitter<MmpiPlot> = new EventEmitter();

  @Input()
  public  readonly emitter: ResultEmitter;

  public type: 'individual' | 'total';

  constructor() { }

  public get mmpiExperts(): PkddUser[] {
    return this.emitter && this.emitter.results.filter(r => r.mmpiComplete).map(r => r.userInfo);
  }

  ngOnInit() {
  }

}
