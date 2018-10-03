import { UsersListComponent } from './components/users-list/users-list.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    component: AdminPageComponent,
    canActivate: [],
    canActivateChild: [],
    children: [
      { path: 'user-list', component: UsersListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
