import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatChipsModule
} from '@angular/material';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatChipsModule
];

@NgModule({
  imports: imports,
  exports: imports
})
export class MaterialImportsModule { }
