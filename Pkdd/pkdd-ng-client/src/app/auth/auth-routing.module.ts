import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from 'src/app/auth/components/auth-page/auth-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RestoreComponent } from './components/restore/restore.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent,
    canActivate: [UnauthGuard],
    canActivateChild: [UnauthGuard],
    children: [
      { path: '', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'restore', component: RestoreComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
