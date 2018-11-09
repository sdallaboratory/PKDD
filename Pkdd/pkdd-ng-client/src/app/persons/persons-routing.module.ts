import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonsPageComponent } from './components/persons-page/persons-page.component';
import { PkddPageComponent } from '../app-module/components/pkdd-page/pkdd-page.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonLuscherComponent } from './components/person-luscher/person-luscher.component';
import { PersonPhysiognomyComponent } from './components/person-physiognomy/person-physiognomy.component';
import { PersonResultsComponent } from './components/person-results/person-results.component';
import { PersonMenuResolver } from './resolvers/person-menu-resolver';
import { PersonsResolverService } from './resolvers/persons-resolver.service';
import { PersonMmpiComponent } from '../mmpi-test/components/person-mmpi/person-mmpi.component';
import { ResultsResolverService } from '../mmpi-test/resolvers/results-resolver.service';
import { PersonResolverService } from './resolvers/person-resolver.service';

const personsRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/persons'
  }, {
    // path: '', component: PkddPageComponent, children: [{
    path: '', component: PkddPageComponent, canActivate: [AuthGuard],
    canActivateChild: [AuthGuard], children: [{
      path: 'persons',
      component: PersonsPageComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
        { path: '', component: PersonsListComponent, resolve: { persons: PersonsResolverService } },
        {
          path: ':id',
          component: PersonDetailsPageComponent,
          resolve: {
            menu: PersonMenuResolver,
            personModel: PersonResolverService
          },
          children: [
            { path: '', component: PersonInfoComponent },
            { path: 'mmpi', component: PersonMmpiComponent, resolve: { results: ResultsResolverService } },
            {
              path: 'edit',
              component: PersonEditComponent,
              resolve: { personModel: PersonResolverService }
            },
            { path: 'luscher', component: PersonLuscherComponent },
            { path: 'physiognomy', component: PersonPhysiognomyComponent },
            {
              path: 'results',
              component: PersonResultsComponent,
              resolve: { personModel: PersonResolverService }
            },
          ]
        }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(personsRoutes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
