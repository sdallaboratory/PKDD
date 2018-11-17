import { Injectable } from '@angular/core';
import { Configuration } from '../../models/core/configuration';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(
    private readonly http: HttpClient
  ) {
    this.config = environment;
  }

  private async checkBackends() {
    this.backendOrigin = null;
    for (let i = 0; i < this.config.backendOrigins.length; i++ && !this.backendOrigin) {
      const checkedOrigin = this.config.backendOrigins[i];
      if (await this.checkOrigin(checkedOrigin)) {
        this.backendOrigin = checkedOrigin;
      }
    }
  }

  private async checkOrigin(backendOrigin: string): Promise<boolean> {
    try {
      const response = await this.http.get<string>(backendOrigin + '/api/diagnostics/ping').pipe(first()).toPromise();
      console.log(response);
      return response === 'ok';
    } catch {
      return false;
    }
  }

  private backendOrigin: string;

  public async getBackendOrigin(): Promise<string> {
    return this.config.backendOrigins[0];
    // TODO: Implement backend checking logic
    // if (this.backendOrigin === undefined) {
    //   await this.checkBackends();
    // }
    // return this.backendOrigin;
  }

  public readonly config: Configuration;
}
