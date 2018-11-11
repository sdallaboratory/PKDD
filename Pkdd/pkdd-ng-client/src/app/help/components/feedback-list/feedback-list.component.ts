import { PkddUser } from 'src/app/models/auth/pkdd-user';
import { RouteDataProviderService } from 'src/app/core/services/route-data-provider.service';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FeedbackProviderService } from '../../services/feedback-provider.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'pkdd-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  public issues: Issue[];

  public user: PkddUser;

  constructor(
    private route: ActivatedRoute,
    private repos: FeedbackProviderService,
    private userProvider: AuthService,
  ) { }

  async ngOnInit() {
    this.issues = (await this.route.data.pipe(first()).toPromise())['issues'];
    this.user = await this.userProvider.getUserAsync();
  }

  public lastAnswer(issue: Issue) {
    if (issue.answers.length === 0) {
      return null;
    }
    return issue.answers.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      } else {
        return -1;
      }
    })[issue.answers.length - 1];
  }

  public deleteIssue(issue: Issue) {
    console.log('delete');
    
    this.repos.deleteIssue(issue.id);
  }

}
