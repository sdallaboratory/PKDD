import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportsModule,
    CoreModule,
    AuthModule,
  ],
  declarations: [AccountPageComponent]
})
export class AccountModule { }
