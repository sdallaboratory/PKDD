import { Component, OnInit } from '@angular/core';
import { Issue, IssueType } from 'src/app/help/models/Issue';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FeedbackProviderService } from 'src/app/help/services/feedback-provider.service';

@Component({
  selector: 'pkdd-user-issues',
  templateUrl: './user-issues.component.html',
  styleUrls: ['./user-issues.component.scss']
})
export class UserIssuesComponent implements OnInit {

  public get improvment(): Issue[] {
    if (!this.allIssues) {
      return [];
    }
    return this.allIssues.filter(iss => iss.type === IssueType.Improvement && !iss.isDeleted);
  }
  public get error(): Issue[] {
    if (!this.allIssues) {
      return [];
    }
    return this.allIssues.filter(iss => iss.type === IssueType.Error && !iss.isDeleted);
  }
  public get comment(): Issue[] {
    if (!this.allIssues) {
      return [];
    }
    return this.allIssues.filter(iss => iss.type === IssueType.Comment && !iss.isDeleted);
  }

  public allIssues: Issue[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.allIssues = (await this.route.data.pipe(first()).toPromise())['issues'];
  }


}
