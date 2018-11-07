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
    // const config = {
    //   type: 'line',
    //   data: {
    //     labels: Object.keys(new MmpiResult()),
    //     datasets: [{
    //       label: '',
    //       data: [67, 22, 38, 87, 55, 56, 45, 78, 89, 23],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)'
    //       ],
    //       borderWidth: 1,
    //       pointRadius: 10,
    //       pointHoverRadius: 15,
    //     }]
    //   },
    //   options: {
    //     plugins: {
    //       dragData: true,
    //     },
    //     responsive: true,
    //   },
    // };
    // (<any>config.options).dragData = true;
    // (<any>config.options).onDragEnd = () => console.log(config.data.datasets[0].data);
    // console.log(config);
    console.log(this.config);
    const chart = new Chart(this.ctx, this.config);
    console.log(chart);
    return chart;
  }
}
