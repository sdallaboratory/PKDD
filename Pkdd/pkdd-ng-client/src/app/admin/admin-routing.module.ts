import { UsersListComponent } from './components/users-list/users-list.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuResolverService } from './resolvers/admin-menu-resolver.service';
import { PkddPageComponent } from '../app-module/components/pkdd-page/pkdd-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PkddRoles } from '../models/auth/pkdd-roles.enum';
import { UserCreateComponent } from './components/user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: PkddPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        path: 'admin',
        component: AdminPageComponent,
        resolve: {
          menu: AdminMenuResolverService
        },
        children: [
          {
            path: 'user-list',
            component: UsersListComponent,
            canActivate: [AuthGuard.forRoles(PkddRoles.admin)]
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'user-list'
          }

        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
