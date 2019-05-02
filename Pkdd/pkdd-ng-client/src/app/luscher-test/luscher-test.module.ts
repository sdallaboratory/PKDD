import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertLuscherComponent } from './components/expert-luscher/expert-luscher.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { LuscherTestComponent } from './components/luscher-test/luscher-test.component';
import { TechLuscherComponent } from './components/tech-luscher/tech-luscher.component';
import { PkddChartsModule } from '../pkdd-charts/pkdd-charts.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MaterialImportsModule,
    PkddChartsModule,
    RouterModule,
  ],
  declarations: [ExpertLuscherComponent, LuscherTestComponent, TechLuscherComponent],
  exports: [ExpertLuscherComponent, LuscherTestComponent, TechLuscherComponent]
})
export class LuscherTestModule { }
