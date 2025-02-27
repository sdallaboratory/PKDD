import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { StrongestRolePipe } from './pipes/strongest-role.pipe';
import { UserIssuesComponent } from './components/user-issues/user-issues.component';
import { UserIssuesItemComponent } from './components/user-issues-item/user-issues-item.component';
import { LayoutModule } from '../layout/layout.module';
import { UserColorPipe } from './pipes/user-color.pipe';
import { SearchModule } from '../search/search.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    CoreModule,
    MaterialImportsModule,
    AuthModule,
    SearchModule,
    LayoutModule
  ],
  declarations: [
    UsersListComponent,
    UserCardComponent,
    AdminPageComponent,
    UserCreateComponent,
    StrongestRolePipe,
    UserIssuesComponent,
    UserIssuesItemComponent,
    UserColorPipe,
    UserCreateComponent
  ]
})
export class AdminModule { }
