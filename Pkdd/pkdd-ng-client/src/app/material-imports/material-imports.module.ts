import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatIconModule, MatSidenavModule
} from '@angular/material';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule
];

@NgModule({
  imports: imports,
  exports: imports
})
export class MaterialImportsModule { }
