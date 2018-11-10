import { Injectable } from '@angular/core';
import { PkddHttpService } from 'src/app/core/services/pkdd-http.service';
import { Issue } from '../models/Issue';
import { ApiUrlConstructorService } from 'src/app/core/services/api-url-constructor.service';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class FeedbackProviderService {

  constructor(
    private readonly http: PkddHttpService,
    private readonly url: ApiUrlConstructorService
  ) { }

  private _allIssues: Issue[] = [];
  public async getAllIssues() {
    if (this._allIssues.length > 0) {
      return this._allIssues;
    }
    try {
      this._allIssues = await this.http.get<Issue[]>(this.url.getIssueUrl());
      return this._allIssues;
    } catch {
      return [];
    }
  }

  public async getUserIssues(userId: number) {
    let issues = this._allIssues.filter(i => i.user.id === userId);
    if (issues.length > 0) {
      return issues;
    }
    try {
      issues = await this.http.get<Issue[]>(this.url.getIssueUrl(null, userId));
      this._allIssues = this._allIssues.concat(issues);
      return issues;
    } catch (error) {
      return [];
    }
  }

  public async addIssue(issue: Issue) {
    try {
      issue.id = 0;
      const newIssue = await this.http.post<Issue>(this.url.getIssueUrl(), issue);
      this._allIssues.push(newIssue);
    } catch {
    }
  }

  public async deleteIssue(id: number) {
    if (!this._allIssues.find(i => i.id === id)) {
      return;
    }
    try {
      await this.http.delete(this.url.getIssueUrl(id));
      this._allIssues.splice(this._allIssues.findIndex(i => i.id === id), 1);
    } catch (error) {
    }
  }

  public async updateIssue(id) {
    const issue = this._allIssues.find(i => i.id === id);
    if (!issue) {
      return;
    }
    try {
      await this.http.put(this.url.getIssueUrl(), issue);
    } catch (error) {
    }
  }

  public async addAnswer(issueId: number, answer: Answer) {
    try {
      answer.id = 0;
      const newAnser = await this.http.post<Answer>(this.url.getAnswerUrl(issueId), answer);
      const issue = this._allIssues.find(i => i.id === issueId);
      issue.answers.push(newAnser);
    } catch {
    }
  }

  public async deleteAnswer(issueId: number, answerId: number) {
    try {
      await this.http.delete<Answer>(this.url.getAnswerUrl(issueId, answerId));
      const issue = this._allIssues.find(i => i.id === issueId);
      issue.answers.splice(issue.answers.findIndex(ans => ans.id === answerId));
    } catch {
    }
  }

  public async updateAnswer(issueId: number, answerId: number) {
    const answer = this._allIssues.find(i => i.id === issueId).answers.find(ans => ans.id === answerId);
    if (!answer) {
      return;
    }
    try {
      await this.http.put<Answer>(this.url.getAnswerUrl(issueId), answer);
    } catch {
    }
  }

}
