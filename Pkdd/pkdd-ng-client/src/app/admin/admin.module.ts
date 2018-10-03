import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    CoreModule,
    MaterialImportsModule,
  ],
  declarations: [
    UsersListComponent,
    UserCardComponent,
    AdminPageComponent
  ]
})
export class AdminModule { }
