import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { InteractiveChartComponent } from './components/interactive-chart/interactive-chart.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [InteractiveChartComponent, ChartComponent],
  exports: [InteractiveChartComponent]
})
export class PkddChartsModule { }
