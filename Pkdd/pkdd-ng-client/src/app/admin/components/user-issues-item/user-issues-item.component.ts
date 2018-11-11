import { Component, OnInit, Input } from '@angular/core';
import { Issue } from 'src/app/help/models/Issue';
import { FeedbackProviderService } from 'src/app/help/services/feedback-provider.service';

@Component({
  selector: 'pkdd-user-issues-item',
  templateUrl: './user-issues-item.component.html',
  styleUrls: ['./user-issues-item.component.scss']
})
export class UserIssuesItemComponent implements OnInit {

  @Input()
  public issue: Issue;

  constructor(
    private repos: FeedbackProviderService,

  ) { }

  ngOnInit() {
  }

  public async deleteIssue() {
    this.issue.isDeleted = true;
    await this.repos.updateIssue(this.issue);
  }

  public async solveIssue() {
    await this.repos.solveIssue(this.issue);
  }

}
