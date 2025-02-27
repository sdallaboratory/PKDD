import { AdminMenuResolverService } from './../admin/resolvers/admin-menu-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PkddPageComponent } from './components/pkdd-page/pkdd-page.component';
import { PersonsListComponent } from '../persons/components/persons-list/persons-list.component';
import { AccountPageComponent } from '../account/components/account-page/account-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminPageComponent } from '../admin/components/admin-page/admin-page.component';
import { PkddRoles } from '../models/auth/pkdd-roles.enum';
import { NoMenuResolver } from '../core/resolvers/no-menu.resolver';
import { MenuItem } from '../models/core/menu-item';

const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full', },
  {
    path: '',
    component: PkddPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'account', component: AccountPageComponent, resolve: {
              menu: NoMenuResolver
            }
          },
        ]
      }]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
