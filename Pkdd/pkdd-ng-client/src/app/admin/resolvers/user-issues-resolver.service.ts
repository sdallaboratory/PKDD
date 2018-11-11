import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Issue } from 'src/app/help/models/Issue';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FeedbackProviderService } from 'src/app/help/services/feedback-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UserIssuesResolverService implements Resolve<Issue[]> {

  constructor(
    private readonly repos: FeedbackProviderService
  ) { }

  public async resolve() {
    return await this.repos.getAllIssues();
  }
}

