import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverPulseComponent } from './components/hover-pulse/hover-pulse.component';
import { AlignerComponent } from './components/aligner/aligner.component';
import { CopyrightComponent } from './components/copyright/copyright.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HoverPulseComponent,
    AlignerComponent,
    CopyrightComponent,
  ],
  exports: [
    HoverPulseComponent,
    AlignerComponent,
    CopyrightComponent,
  ]
})
export class LayoutModule { }
