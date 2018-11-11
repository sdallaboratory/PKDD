import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Issue } from '../models/Issue';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FeedbackProviderService } from '../services/feedback-provider.service';

@Injectable({
  providedIn: 'root'
})
export class IssueListResolverService implements Resolve<Issue[]> {

  constructor(
    private readonly user: AuthService,
    private readonly repos: FeedbackProviderService
  ) { }

  public async resolve() {
    return await this.repos.getUserIssues((await this.user.getUserAsync()).id);
  }
}
