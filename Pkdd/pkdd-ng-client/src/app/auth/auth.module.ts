import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RestoreComponent } from './components/restore/restore.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MaterialImportsModule,
    AuthRoutingModule,
  ],
  declarations: [
    AuthPageComponent,
    SignInComponent,
    SignUpComponent,
    RestoreComponent
  ]
})
export class AuthModule { }
