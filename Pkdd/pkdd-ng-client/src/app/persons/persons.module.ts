import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { AuthModule } from '../auth/auth.module';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { PersonsPageComponent } from './components/persons-page/persons-page.component';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonLuscherComponent } from './components/person-luscher/person-luscher.component';
import { PersonPhysiognomyComponent } from './components/person-physiognomy/person-physiognomy.component';
import { PersonResultsComponent } from './components/person-results/person-results.component';
import { MmpiTestModule } from '../mmpi-test/mmpi-test.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    MaterialImportsModule,
    PersonsRoutingModule,
    MmpiTestModule,
    LayoutModule
  ],
  declarations: [
    PersonsListComponent,
    PersonCardComponent,
    PersonsPageComponent,
    PersonDetailsPageComponent,
    PersonInfoComponent,
    PersonEditComponent,
    PersonLuscherComponent,
    PersonPhysiognomyComponent,
    PersonResultsComponent]
})
export class PersonsModule { }
