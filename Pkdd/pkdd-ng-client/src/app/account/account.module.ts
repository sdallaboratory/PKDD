import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportsModule
  ],
  declarations: [AccountPageComponent]
})
export class AccountModule { }
