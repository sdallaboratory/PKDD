import { UsersListComponent } from './components/users-list/users-list.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuResolverService } from './resolvers/admin-menu-resolver.service';
import { PkddPageComponent } from '../app-module/components/pkdd-page/pkdd-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserIssuesComponent } from './components/user-issues/user-issues.component';
import { UserIssuesResolverService } from './resolvers/user-issues-resolver.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { PkddRoles } from '../models/auth/pkdd-roles.enum';

const routes: Routes = [
  {
    path: '',
    component: PkddPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        data: {
          roles: [PkddRoles.admin]
        },
        canActivate: [AuthGuard, RoleGuard],
        path: 'admin',
        component: AdminPageComponent,
        resolve: {
          menu: AdminMenuResolverService
        },
        children: [
          {
            path: 'user-list',
            component: UsersListComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'user-list'
          },
          {
            path: 'issues',
            component: UserIssuesComponent,
            resolve: {
              issues: UserIssuesResolverService
            },
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
