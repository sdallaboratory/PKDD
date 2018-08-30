import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from 'src/app/auth/components/auth-page/auth-page.component';

const authRoutes: Routes = [
  { path: 'auth/register', component: AuthPageComponent},
  { path: 'auth/restore', component: AuthPageComponent},
  { path: 'auth', component: AuthPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
