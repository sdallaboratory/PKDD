import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule
  ],
  declarations: [FeedbackFormComponent]
})
export class HelpModule { }
