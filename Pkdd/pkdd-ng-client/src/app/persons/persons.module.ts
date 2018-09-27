import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { AuthModule } from '../auth/auth.module';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    MaterialImportsModule
  ],
  declarations: [PersonsListComponent, PersonCardComponent]
})
export class PersonsModule { }
