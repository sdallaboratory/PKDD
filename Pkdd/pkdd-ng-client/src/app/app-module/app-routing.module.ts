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
import { MenuResolver } from '../core/resolvers/menu.resolver';
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
          // { path: 'persons', component: PersonsListComponent, resolve: { menu: MenuResolver.noItems() } },
          {
            path: 'account', component: AccountPageComponent, resolve: {
              menu: MenuResolver.forItems([new MenuItem('Профиль', 'asd', 'person', true),
              new MenuItem('Настройки', 's', 'build', true)])
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
