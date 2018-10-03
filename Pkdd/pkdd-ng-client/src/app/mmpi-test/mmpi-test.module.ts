import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonMmpiComponent } from './components/person-mmpi/person-mmpi.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [PersonMmpiComponent]
})
export class MmpiTestModule { }
