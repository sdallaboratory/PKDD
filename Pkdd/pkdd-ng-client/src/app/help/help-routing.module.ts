import { FeedbackGuard } from './guards/feedback.guard';
import { IssueComponent } from './components/issue/issue.component';
import { IssuesResolverService } from './resolvers/issues-resolver.service';
import { HelpMenuResolverService } from './resolvers/help-menu-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PkddPageComponent } from '../app-module/components/pkdd-page/pkdd-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { IssueListResolverService } from './resolvers/issue-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PkddPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'help',
        component: HelpPageComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {
          menu: HelpMenuResolverService,
        },
        children: [
          {
            canActivate: [AuthGuard],
            canActivateChild: [AuthGuard],
            path: 'feedback',
            component: FeedbackListComponent,
            resolve: {
              issues: IssueListResolverService
            },
           },
           {
            canActivate: [AuthGuard, FeedbackGuard],
            canActivateChild: [AuthGuard],
            path: 'feedback/:userId/:feedbackId',
            component: IssueComponent,
            resolve: {
              issue: IssuesResolverService
            },
           },
          {
            path: 'description',
            component: ProjectDescriptionComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'description'
          }
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {
 }
