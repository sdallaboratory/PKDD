import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsListComponent } from './components/persons-list/persons-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PersonsListComponent]
})
export class PersonsModule { }
