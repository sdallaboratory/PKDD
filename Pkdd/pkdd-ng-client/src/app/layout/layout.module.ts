import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverPulseComponent } from './components/hover-pulse/hover-pulse.component';
import { AlignerComponent } from './components/aligner/aligner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HoverPulseComponent, AlignerComponent],
  exports: [HoverPulseComponent, AlignerComponent]
})
export class LayoutModule { }
