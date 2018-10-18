import { Injectable } from '@angular/core';
import { PkddHttpService } from 'src/app/core/services/pkdd-http.service';
import { ApiUrlConstructorService } from 'src/app/core/services/api-url-constructor.service';
import { TestResult } from 'src/app/models/persons/results/test-result';

@Injectable({
  providedIn: 'root'
})
export class ResultsProviderService {

  constructor(
    private readonly http: PkddHttpService,
    private readonly url: ApiUrlConstructorService
  ) { }

  public async get(personId: number, userId: number) {
    // TODO: provide url with ApiUrlConstructorService
    return this.http.get<TestResult>(`api/test-result/${personId}/${userId}`);
  }

  public async send(result: TestResult) {
    // TODO: provide url with ApiUrlConstructorService
    return this.http.post<TestResult>(`api/test-result`, result);
  }

}
