import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import 'chartjs-plugin-dragdata';
import 'chartjs-plugin-annotation';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ChartComponent],
  exports: [ChartComponent]
})
export class PkddChartsModule { }
