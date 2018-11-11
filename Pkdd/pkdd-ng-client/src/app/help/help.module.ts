import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { AuthModule } from '../auth/auth.module';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { IssueComponent } from './components/issue/issue.component';
import { AnswerComponent } from './components/answer/answer.component';
import { AboutMmpiComponent } from './components/about-mmpi/about-mmpi.component';
import { AboutLucherComponent } from './components/about-lucher/about-lucher.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    FormsModule,
    CoreModule,
    MaterialImportsModule,
    AuthModule,
  ],
  declarations: [
    FeedbackFormComponent,
    HelpPageComponent,
    ProjectDescriptionComponent,
    FeedbackListComponent,
    IssueComponent,
    AnswerComponent,
    AboutMmpiComponent,
    AboutLucherComponent,
  ]
})
export class HelpModule {
}
