import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { MaterialImportsModule } from '../material-imports/material-imports.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportsModule
  ],
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
})
export class NotificationModule { }
