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
  private ctx;
  private chart: Chart;

  public ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.config) {
      this.InitializeCanvas();
    }
  }

  private InitializeCanvas() {
    if (this.config.dragData) {
      (<any>this.config.options).dragData = true;
    }
    if (this.config.onDragEnd) {
      (<any>this.config.options).onDragEnd = this.config.onDragEnd;
    }
    this.config.update = () => { chart.update(); console.log('updated'); };
    console.log(this.config);
    const chart = new Chart(this.ctx, this.config);
    return chart;
  }
}
