import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from './services/environment.service';
import { WindowService } from './services/window.service';
import { MenuService } from './services/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuNoItems } from './resolvers/menu-no-items';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MmpiScalePipe } from './pipes/mmpi-scale.pipe';
import { LuscherColorPipe } from './pipes/luscher-color.pipe';
import { GroupPipe } from './pipes/group.pipe';
import { RolePipe } from './pipes/role.pipe';

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
    LuscherColorPipe,
  ],
  declarations: [
    TruncatePipe,
    MmpiScalePipe,
    LuscherColorPipe,
    GroupPipe,
    RolePipe,
  ],
  exports: [
    TruncatePipe,
    MmpiScalePipe,
    LuscherColorPipe,
    GroupPipe,
    RolePipe,
  ]
})
export class CoreModule { }
