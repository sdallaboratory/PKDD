import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonsPageComponent } from './components/persons-page/persons-page.component';
import { PkddPageComponent } from '../app-module/components/pkdd-page/pkdd-page.component';
import { MenuResolver } from '../core/resolvers/menu.resolver';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonMmpiComponent } from './components/person-mmpi/person-mmpi.component';
import { PersonLuscherComponent } from './components/person-luscher/person-luscher.component';
import { PersonPhysiognomyComponent } from './components/person-physiognomy/person-physiognomy.component';
import { PersonResultsComponent } from './components/person-results/person-results.component';
import { MenuItem } from '../models/core/menu-item';
import { PersonMenuResolver } from './resolvers/person-menu-resolver';
import { PersonsResolverService } from './resolvers/persons-resolver.service';
import { PersonResolverService } from './resolvers/person-resolver.service';

const personsRoutes: Routes = [
  {
    path: '', component: PkddPageComponent, canActivate: [AuthGuard],
    canActivateChild: [AuthGuard], children: [{
      path: 'persons',
      component: PersonsPageComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
        { path: '', component: PersonsListComponent, resolve: { persons: PersonsResolverService, menu: MenuResolver.noItems() } },
        {
          path: ':id',
          component: PersonDetailsPageComponent,
          resolve: {
            menu: PersonMenuResolver
          },
          children: [
            { path: '', component: PersonInfoComponent },
            {
              path: 'edit',
              component: PersonEditComponent,
              resolve: {
                personModel: PersonResolverService
              }
            },
            { path: 'mmpi', component: PersonMmpiComponent },
            { path: 'luscher', component: PersonLuscherComponent },
            { path: 'physiognomy', component: PersonPhysiognomyComponent },
            { path: 'results', component: PersonResultsComponent },
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
