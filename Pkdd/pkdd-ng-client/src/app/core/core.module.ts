import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from './services/environment.service';
import { WindowService } from './services/window.service';
import { MenuService } from './services/menu.service';
import { CopyrightComponent } from './components/copyright/copyright.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    EnvironmentService,
    MenuService,
    WindowService
  ],
  declarations: [CopyrightComponent],
  exports: [CopyrightComponent]
})
export class CoreModule { }
