import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonMmpiComponent } from './components/person-mmpi/person-mmpi.component';
import { CoreModule } from '../core/core.module';
import { MmpiColumnComponent } from './components/mmpi-column/mmpi-column.component';
import { LayoutModule } from '../layout/layout.module';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { PkddChartsModule } from '../pkdd-charts/pkdd-charts.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MaterialImportsModule,
    LayoutModule,
    PkddChartsModule
  ],
  declarations: [PersonMmpiComponent, MmpiColumnComponent]
})
export class MmpiTestModule { }
