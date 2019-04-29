import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from './services/environment.service';
import { WindowService } from './services/window.service';
import { MenuService } from './services/menu.service';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuNoItems } from './resolvers/menu-no-items';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MmpiScalePipe } from './pipes/mmpi-scale.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    EnvironmentService,
    MenuService,
    WindowService,
    MenuNoItems,
    MmpiScalePipe,
    TruncatePipe,
  ],
  declarations: [
    CopyrightComponent,
    TruncatePipe,
    MmpiScalePipe,
  ],
  exports: [
    CopyrightComponent,
    TruncatePipe,
    MmpiScalePipe,
  ]
})
export class CoreModule { }
