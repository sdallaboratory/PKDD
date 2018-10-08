import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverPulseComponent } from './components/hover-pulse/hover-pulse.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HoverPulseComponent],
  exports: [HoverPulseComponent]
})
export class LayoutModule { }
