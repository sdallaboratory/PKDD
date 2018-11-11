import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/help/models/Issue';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FeedbackProviderService } from 'src/app/help/services/feedback-provider.service';

@Component({
  selector: 'pkdd-user-issues',
  templateUrl: './user-issues.component.html',
  styleUrls: ['./user-issues.component.scss']
})
export class UserIssuesComponent implements OnInit {

  public issues: Issue[];

  constructor(
    private route: ActivatedRoute,
    private repos: FeedbackProviderService,
  ) { }

  async ngOnInit() {
    this.issues = (await this.route.data.pipe(first()).toPromise())['issues'];
    console.log(this.issues);
    
  }

  public deleteIssue(issue: Issue) {
    this.repos.deleteIssue(issue.id);
  }

}
