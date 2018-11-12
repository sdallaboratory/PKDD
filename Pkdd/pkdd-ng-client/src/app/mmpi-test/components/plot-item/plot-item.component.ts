import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IndividualPlot } from '../../models/individual-plot';
import { TotalPlot } from '../../models/total-plot';

@Component({
  selector: 'pkdd-plot-item',
  templateUrl: './plot-item.component.html',
  styleUrls: ['./plot-item.component.scss']
})
export class PlotItemComponent implements OnInit {

  constructor() { }

  @Input()
  public readonly plot: IndividualPlot | TotalPlot;

  @Output()
  public readonly deleted: EventEmitter<void> = new EventEmitter();

  public get asIndividual(): IndividualPlot {
    if (this.plot.type !== 'individual') {
      return null;
    }
    return this.plot as IndividualPlot;
  }

  public get asTotal(): TotalPlot {
    if (this.plot.type !== 'total') {
      return null;
    }
    return this.plot as TotalPlot;
  }

  public onDelete() {
    this.deleted.emit();
  }

  ngOnInit() { }

}
