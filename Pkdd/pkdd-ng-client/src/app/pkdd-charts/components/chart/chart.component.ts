import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as Chart from 'chart.js';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { ChartConfiguration } from 'chart.js';
import { PkddChartConfiguration } from '../../models/config';

@Component({
  selector: 'pkdd-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  config: PkddChartConfiguration;

  @ViewChild('chartCanvas')
  private readonly canvas: ElementRef;
  private canvasContext;
  private chart: Chart;

  public ngAfterViewInit() {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.canvasContext && this.config) {
      this.InitializeChart();
    }
  }

  private InitializeChart(): void {
    if (this.config.dragData) {
      (<any>this.config.options).dragData = true;
    }
    if (this.config.onDragEnd) {
      (<any>this.config.options).onDragEnd = this.config.onDragEnd;
    }
    if (this.config.onDragStart) {
      (<any>this.config.options).onDragStart = this.config.onDragStart;
    }
    this.chart = new Chart(this.canvasContext, this.config);
    this.config.update = () => this.chart.update();
  }

}
