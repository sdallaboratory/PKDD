import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PkddPageComponent } from './components/pkdd-page/pkdd-page.component';
import { PersonsListComponent } from '../persons/components/persons-list/persons-list.component';
import { AccountPageComponent } from '../account/components/account-page/account-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminPageComponent } from '../admin/components/admin-page/admin-page.component';
import { PkddRoles } from '../models/auth/pkdd-roles.enum';

const routes: Routes = [
  {
    path: '',
    component: PkddPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'persons', component: PersonsListComponent, },
          { path: 'account', component: AccountPageComponent, },
          {
            path: 'admin',
            component: AdminPageComponent,
            canActivate: [AuthGuard.forRoles(PkddRoles.admin)],
            canActivateChild: [AuthGuard.forRoles(PkddRoles.admin)]
          },
          { path: '', redirectTo: '/persons', pathMatch: 'full', },
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
