import { Injectable } from '@angular/core';
import { Results } from '../../models/persons/results/results';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ServerDataStorageService } from '../services/server-data-storage.service';
import { AuthService } from '../../auth/services/auth.service';
import { MmpiResult } from '../../models/persons/results/mmpi-result';

@Injectable({
  providedIn: 'root'
})
export class ResultsResolverService implements Resolve<Results> {

  constructor(
    private readonly storage: ServerDataStorageService,
    private readonly auth: AuthService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Results> {
    // return this.storage.getResults(+route.paramMap.get('id'));
    const results = new Results();
    results.mmpi = new MmpiResult();
    for (const key of Object.keys( results.mmpi)) {
      results.mmpi[key] = Math.random() * 100;
    }
    return results;
  }
}
