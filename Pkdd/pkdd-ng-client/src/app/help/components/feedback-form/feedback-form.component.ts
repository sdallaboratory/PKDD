import { WindowService } from './../../../core/services/window.service';
import { FeedbackProviderService } from './../../services/feedback-provider.service';
import { PkddUser } from './../../../models/auth/pkdd-user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';

@Component({
  selector: 'pkdd-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  public issue: Issue;

  private currentUser: PkddUser;

  constructor(
    private readonly authServ: AuthService,
    private readonly provider: FeedbackProviderService,
    public readonly window: WindowService
  ) { }

  async ngOnInit() {
    this.currentUser = await this.authServ.getUserAsync();
    this.issue = new Issue(this.currentUser);
  }

  public async onIssueAdd() {
    const result = this.provider.addIssue(this.issue);
    if (result) {
      this.issue = new Issue(this.currentUser);
    }
  }

}
