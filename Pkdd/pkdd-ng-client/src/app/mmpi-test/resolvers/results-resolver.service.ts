import { Injectable } from '@angular/core';
import { TestResult } from '../../models/persons/results/test-result';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ResultsProviderService } from 'src/app/test/services/results-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsResolverService implements Resolve<TestResult> {

  constructor(
    private readonly auth: AuthService,
    private readonly provider: ResultsProviderService
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<TestResult> {
    const user = await this.auth.getUserAsync();
    // TODO: универсализировать источник id
    const personId = +route.parent.paramMap.get('id');
    const result = await this.provider.get(personId, user.id);
    return result;
  }
}
