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
import { ResultsResolverService } from '../test/resolvers/results-resolver.service';
import { PersonResolverService } from './resolvers/person-resolver.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { PkddRoles } from '../models/auth/pkdd-roles.enum';
import { PkddRouteData } from '../models/common/pkdd-route-data';
import { ExpertLuscherComponent } from '../luscher-test/components/expert-luscher/expert-luscher.component';
import { ExpertPhysiognomyComponent } from '../physiognomy-test/components/expert-physiognomy/expert-physiognomy.component';

const personsRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/persons'
  }, {
    path: '',
    component: PkddPageComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'persons',
      component: PersonsPageComponent,
      children: [
        {
          path: '',
          component: PersonsListComponent,
          resolve: { persons: PersonsResolverService }
        },
        {
          path: ':id',
          component: PersonDetailsPageComponent,
          resolve: {
            menu: PersonMenuResolver,
            personModel: PersonResolverService
          },
          data: {
            sideMenuItems: {
              common: []
            }
          } as PkddRouteData,
          canActivateChild: [RoleGuard],
          children: [
            {
              path: '',
              component: PersonInfoComponent
            },
            {
              path: 'mmpi', component: PersonMmpiComponent,
              resolve: { results: ResultsResolverService, personModel: PersonResolverService },
              data: { roles: ['expert'] }
            },
            {
              path: 'edit',
              component: PersonEditComponent,
              resolve: { personModel: PersonResolverService },
              data: { roles: ['tech'] }
            },
            {
              path: 'luscher', component: ExpertLuscherComponent,
              resolve: { results: ResultsResolverService, personModel: PersonResolverService },
              data: { roles: ['expert'] }
            },
            {
              path: 'physiognomy',
              component: ExpertPhysiognomyComponent,
              resolve: { results: ResultsResolverService, personModel: PersonResolverService },
              data: { roles: ['expert'] }
            },
            {
              path: 'results',
              component: PersonResultsComponent,
              resolve: { personModel: PersonResolverService },
              data: { roles: ['tech'] }
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
