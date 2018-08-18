import { NgModule } from '@angular/core';

import {
  MatButtonModule
} from '@angular/material';

const imports = [
  MatButtonModule
];

@NgModule({
  imports: imports,
  exports: imports
})
export class MaterialImportsModule { }
