import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule
} from '@angular/material';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule
];

@NgModule({
  imports: imports,
  exports: imports
})
export class MaterialImportsModule { }
