import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './../material-imports/material-imports.module';

import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuService } from './services/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    AppRoutingModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
