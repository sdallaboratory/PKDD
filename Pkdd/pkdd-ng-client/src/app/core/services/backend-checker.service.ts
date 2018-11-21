import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/internal/operators/first';
import { firstResolved } from '../utils/first-resolved';

@Injectable({
  providedIn: 'root'
})
export class BackendCheckerService {

  private checkingPromise: Promise<void>;

  private backendOrigin: string;

  constructor(
    private readonly env: EnvironmentService,
    private readonly http: HttpClient
  ) { }

  private async defineOrigin() {
    const promises = this.env.config.backendOrigins.map(o => this.checkOrigin(o));
    try {
      this.backendOrigin = await firstResolved(promises);
    } catch { }
  }

  public async checkOrigin(backendOrigin: string): Promise<string> {
    const response = await this.http.get<any>(backendOrigin + 'api/diagnostics/healthcheck').pipe(first()).toPromise();
    console.log(response);
    if (response.statusMessage === 'Ok') {
      return backendOrigin;
    } else {
      throw new Error(`Origin ${backendOrigin} is unavaliable`);
    }
  }


  public async getBackendOrigin(): Promise<string> {
    if (!this.checkingPromise) {
      this.checkingPromise = this.defineOrigin();
    }

    await this.checkingPromise;

    if (this.backendOrigin == null) {
      throw new Error('There is no working backend listed. Check the environment settings.');
    }
    return this.backendOrigin;
  }

}
