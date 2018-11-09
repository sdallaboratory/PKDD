import { Injectable } from '@angular/core';
import { PkddHttpService } from 'src/app/core/services/pkdd-http.service';
import { ApiUrlConstructorService } from 'src/app/core/services/api-url-constructor.service';
import { TestResult } from 'src/app/models/persons/results/test-result';

@Injectable({
  providedIn: 'root'
})
// TODO: provide url with ApiUrlConstructorService
export class ResultsProviderService {

  constructor(
    private readonly http: PkddHttpService,
    // private readonly url: ApiUrlConstructorService
  ) { }

  public async get(personId: number, userId: number) {
    return this.http.get<TestResult>(`api/test-result/${personId}/${userId}`);
  }

  public async getForPerson(personId: number) {
    return this.http.get<TestResult[]>(`api/test-result/${personId}`);
  }

  public async send(result: TestResult) {
    return this.http.post<TestResult>(`api/test-result`, result);
  }

}
