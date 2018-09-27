import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PkddPageComponent } from './components/pkdd-page/pkdd-page.component';
import { PersonsListComponent } from '../persons/components/persons-list/persons-list.component';
import { AccountPageComponent } from '../account/components/account-page/account-page.component';

const routes: Routes = [
  {
    path: '',
    component: PkddPageComponent,
    children: [
      { path: 'persons', component: PersonsListComponent },
      { path: 'account', component: AccountPageComponent },
      { path: '', redirectTo: '/persons', pathMatch: 'full' },
]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
