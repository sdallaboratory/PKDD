import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './../material-imports/material-imports.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { PkddPageComponent } from './components/pkdd-page/pkdd-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthModule } from '../auth/auth.module';
import { PersonsModule } from '../persons/persons.module';
import { AccountModule } from '../account/account.module';
import { AdminModule } from '../admin/admin.module';
import { LayoutModule } from '../layout/layout.module';
import { HelpModule } from '../help/help.module';
import { NotificationModule } from '../notification/notification.module';
import { RoutingTrackerService } from './services/routing-tracker.service';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SideMenuComponent,
    MenuItemComponent,
    PkddPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    NotificationModule,
    AuthModule,
    PersonsModule,
    AccountModule,
    AdminModule,
    HelpModule,
    AppRoutingModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent],
  providers: [RoutingTrackerService]
})
export class AppModule { }
