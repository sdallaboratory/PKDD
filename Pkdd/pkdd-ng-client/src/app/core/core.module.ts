import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from './services/environment.service';
import { WindowService } from './services/window.service';
import { MenuService } from './services/menu.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    EnvironmentService,
    MenuService,
    WindowService
  ]
})
export class CoreModule { }
