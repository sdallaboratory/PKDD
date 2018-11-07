import { Injectable } from '@angular/core';
import { TestResult } from '../../models/persons/results/test-result';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ServerDataStorageService } from '../../core/services/server-data-storage.service';
import { AuthService } from '../../auth/services/auth.service';
import { MmpiResult } from '../../models/persons/results/mmpi-result';
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
    const result = await this.provider.get(1, user.id);
    return result;
  }
}
