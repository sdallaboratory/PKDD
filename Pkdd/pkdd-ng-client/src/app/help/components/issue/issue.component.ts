import { AuthService } from './../../../auth/services/auth.service';
import { Answer } from './../../models/answer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackProviderService } from '../../services/feedback-provider.service';
import { Issue } from '../../models/Issue';
import { first } from 'rxjs/internal/operators/first';
import { PkddUser } from 'src/app/models/auth/pkdd-user';
import { WindowService } from 'src/app/core/services/window.service';
import { PkddRoles } from 'src/app/models/auth/pkdd-roles.enum';

@Component({
  selector: 'pkdd-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  public issue: Issue;

  public newAnswer;

  public currentUser: PkddUser;

  public get isCurrentUserAdmin() {
    return this.currentUser.roles.includes(PkddRoles.admin);
  }

  constructor(
    private route: ActivatedRoute,
    private userProvider: AuthService,
    private repos: FeedbackProviderService,
    public readonly window: WindowService
  ) { }

  async ngOnInit() {
    this.issue = (await this.route.data.pipe(first()).toPromise())['issue'];
    this.currentUser = await this.userProvider.getUserAsync();
    this.newAnswer = new Answer(this.currentUser, this.issue.answers.length, this.issue.id);
  }

  public async addAnswer() {
    this.repos.addAnswer(this.issue.id, this.newAnswer);
    this.newAnswer = new Answer(this.currentUser, this.issue.answers.length, this.issue.id);
  }

  public async solveIssue() {
    await this.repos.solveIssue(this.issue);
  }

}
