import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertPhysiognomyComponent } from './components/expert-physiognomy/expert-physiognomy.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { PkddChartsModule } from '../pkdd-charts/pkdd-charts.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { PhysiognomyTestComponent } from './components/physiognomy-test/physiognomy-test.component';
import { TechPhysiognomyComponent } from './components/tech-physiognomy/tech-physiognomy.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    FormsModule,
    MaterialImportsModule,
    PkddChartsModule,
    RouterModule,
  ],
  declarations: [ExpertPhysiognomyComponent, PhysiognomyTestComponent, TechPhysiognomyComponent],
  exports: [ExpertPhysiognomyComponent, PhysiognomyTestComponent, TechPhysiognomyComponent]
})
export class PhysiognomyTestModule { }
