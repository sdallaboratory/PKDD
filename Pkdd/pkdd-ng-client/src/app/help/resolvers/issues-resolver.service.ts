import { FeedbackProviderService } from './../services/feedback-provider.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Issue } from '../models/Issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesResolverService implements Resolve<Issue> {

  constructor(
    private readonly repos: FeedbackProviderService,
  ) { }

  public async resolve(snapshot: ActivatedRouteSnapshot) {
    const feedbackId = +snapshot.params['feedbackId'];
    const userId = +snapshot.params['userId'];
    const userFeedbacks = await this.repos.getUserIssues(userId);
    return userFeedbacks.find(i => i.id === feedbackId);
  }
}
