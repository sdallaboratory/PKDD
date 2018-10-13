import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'pkdd-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {

  }

  @ViewChild('canvas')
  private readonly canvas: ElementRef;

  private ctx;

  public ngAfterViewInit() {
    // this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['New', 'In Progress', 'On Hold'],
        datasets: [{
          label: '# of Votes',
          data: [1, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
          pointRadius: 15
        }]
      },
      options: {
        responsive: false,
      }
    });
  }

}
