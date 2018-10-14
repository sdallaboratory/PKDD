import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';

@Component({
  selector: 'pkdd-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {

  }

  @Input()
  options: Chart.ChartConfiguration;

  @ViewChild('chartCanvas')
  private readonly canvas: ElementRef;
  private ctx;
  private chart;

  public ngAfterViewInit() {
    // this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.chart = this.InitializeCanvas();
  }


  private InitializeCanvas() {
    return new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: Object.keys(new MmpiResult()),
        datasets: [{
          label: '# of Votes',
          data: [67, 22, 38, 87, 55, 56, 45, 78, 89, 23],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
          pointRadius: 10,
          pointHoverRadius: 15,
        }]
      },
      options: {
        responsive: true,
        onClick: (event, active) => {
          console.log(event, active);
        },
        onHover: (event, active) => {
          console.log(active);
          console.log(event.buttons);
        }
      },
    });
  }
}
