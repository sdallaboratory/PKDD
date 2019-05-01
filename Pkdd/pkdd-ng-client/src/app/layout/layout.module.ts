import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverPulseComponent } from './components/hover-pulse/hover-pulse.component';
import { AlignerComponent } from './components/aligner/aligner.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { NoNetworkModalComponent } from './components/no-network-modal/no-network-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HoverPulseComponent,
    AlignerComponent,
    CopyrightComponent,
    NoNetworkModalComponent,
  ],
  exports: [
    HoverPulseComponent,
    AlignerComponent,
    CopyrightComponent,
    NoNetworkModalComponent,
  ],
  entryComponents: [
    NoNetworkModalComponent
  ]
})
export class LayoutModule { }
