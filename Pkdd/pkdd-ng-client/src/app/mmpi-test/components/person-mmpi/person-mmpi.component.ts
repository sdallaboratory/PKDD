import { Component, OnInit } from '@angular/core';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { TestResult } from '../../../models/persons/results/test-result';
import { ResultsProviderService } from 'src/app/test/services/results-provider.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'pkdd-person-mmpi',
  templateUrl: './person-mmpi.component.html',
  styleUrls: ['./person-mmpi.component.scss'],
  providers: [RouteDataProviderService]
})
export class PersonMmpiComponent implements OnInit {

  public results: TestResult;

  public get scales() {
    return this.results && Object.keys(this.results.mmpi).map(key => ({ name: key, value: this.results.mmpi[key] }));
  }

  constructor(
    private readonly provider: ResultsProviderService,
    private readonly data: RouteDataProviderService,
    private readonly auth: AuthService
  ) { }

  async ngOnInit() {
    // this.results = await this.data.get<TestResult>('results');
    console.log('getting result');
    const user = await this.auth.getUserAsync();
    const res = this.provider.get(1, user.id);
    console.log('result got', res);
  }

}
