import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialImportsModule,
  ],
  declarations: [LandingPageComponent]
})
export class LandingModule { }
