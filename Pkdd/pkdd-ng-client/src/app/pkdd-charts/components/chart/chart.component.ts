import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as Chart from 'chart.js';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { ChartConfiguration } from 'chart.js';

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
  config: ChartConfiguration;

  @ViewChild('chartCanvas')
  private readonly canvas: ElementRef;
  private ctx;
  private chart: Chart;

  public ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // this.chart = this.InitializeCanvas();
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
    const chart = new Chart(this.ctx, this.config);
    return chart;
  }
}
