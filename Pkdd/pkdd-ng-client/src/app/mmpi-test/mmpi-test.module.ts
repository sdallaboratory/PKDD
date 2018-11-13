import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonMmpiComponent } from './components/person-mmpi/person-mmpi.component';
import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { PkddChartsModule } from '../pkdd-charts/pkdd-charts.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TechMmpiComponent } from './components/tech-mmpi/tech-mmpi.component';
import { PlotCreateComponent } from './components/plot-create/plot-create.component';
import { PlotItemComponent } from './components/plot-item/plot-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CoreModule,
    MaterialImportsModule,
    LayoutModule,
    PkddChartsModule,
  ],
  declarations: [PersonMmpiComponent, TechMmpiComponent, PlotCreateComponent, PlotItemComponent],
  exports: [TechMmpiComponent]
})
export class MmpiTestModule { }
