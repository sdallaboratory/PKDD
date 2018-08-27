import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule
];

@NgModule({
  imports: imports,
  exports: imports
})
export class MaterialImportsModule { }
