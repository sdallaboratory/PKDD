import { Injectable } from '@angular/core';
import { PkddHttpService } from 'src/app/core/services/pkdd-http.service';
import { Issue } from '../models/Issue';
import { ApiUrlConstructorService } from 'src/app/core/services/api-url-constructor.service';
import { Answer } from '../models/answer';
import { TimeTrack } from 'src/app/models/common/time-track';

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
    try {
      const issues = await this.http.get<Issue[]>(this.url.getIssueUrl());
      if (this.userIssues.length > 0) {
        this.userIssues.forEach(iss => {
          if (!this._allIssues.map(i => i.id).includes(iss.id)) {
            this._allIssues.push(iss);
          }
        });
      }
      issues.forEach(iss => {
        if (!this._allIssues.map(i => i.id).includes(iss.id)) {
          this._allIssues.push(iss);
        }
      });
      return this._allIssues;
    } catch {
      return [];
    }
  }

  private userIssues: Issue[] = [];
  public async getUserIssues(userId: number) {
    if (this.userIssues.length > 0 &&
      this.userIssues[0].user.userId !== userId) {
        this.userIssues = [];
      }
    const issues = this._allIssues.filter(i => i.user.userId === userId);
    if (issues.length > 0) {
      issues.forEach(iss => {
        if (!this.userIssues.map(i => i.id).includes(iss.id)) {
          this.userIssues.push(iss);
        }
      });
      return this.userIssues;
    }
    try {
      this.userIssues = await this.http.get<Issue[]>(this.url.getIssueUrl(null, userId));
      this.userIssues.forEach(iss => {
        if (!this._allIssues.map(i => i.id).includes(iss.id)) {
          this._allIssues.push(iss);
        }
      });
      return this.userIssues;
    } catch (error) {
      return this.userIssues;
    }
  }

  public async addIssue(issue: Issue) {
    try {
      issue.id = 0;
      issue.timeTrack = new TimeTrack(new Date(), new Date(), new Date());
      const newIssue = await this.http.post<Issue>(this.url.getIssueUrl(), issue);
      this._allIssues.push(newIssue);
      this.userIssues.push(newIssue);
      return newIssue;
    } catch {
      return null;
    }
  }

  public async deleteIssue(id: number) {
    if (!this._allIssues.find(i => i.id === id)) {
      return;
    }
    try {
      await this.http.delete(this.url.getIssueUrl(id));
      this._allIssues.splice(this._allIssues.findIndex(i => i.id === id), 1);
      if (this.userIssues.map(i => i.id).includes(id)) {
        this.userIssues.splice(this.userIssues.findIndex(i => i.id === id), 1);
      }
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
      answer.timeTrack = new TimeTrack(new Date(), new Date(), new Date());
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

  public async solveIssue(issue: Issue) {
    try {
      await this.http.post(this.url.getIssueUrl(issue.id) + '/solve', {});
      issue.isSolved = !issue.isSolved;
    } catch {

    }
  }

}
