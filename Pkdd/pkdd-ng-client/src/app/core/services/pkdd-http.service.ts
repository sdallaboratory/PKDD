import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { promisify } from 'src/app/core/utils/promisify';
import { BackendCheckerService } from './backend-checker.service';

@Injectable({
  providedIn: 'root'
})
export class PkddHttpService {

  private readonly options: { withCredentials: boolean, headers: {} };

  constructor(
    private readonly http: HttpClient,
    private readonly env: EnvironmentService,
    private readonly backend: BackendCheckerService
  ) {
    if (!env.config.production) {
      this.options = { withCredentials: true, headers: { 'crossDomain': 'true' } };
    }
  }

  public async get<T>(relativeUrl: string) {
    return await promisify<T>(this.http.get<T>(await this.addOrigin(relativeUrl), this.options));
  }

  public async post<T>(relativeUrl: string, body) {
    console.log(body);
    return await promisify<T>(this.http.post<T>(await this.addOrigin(relativeUrl), body, this.options));
  }

  public async put<T>(relativeUrl: string, body) {
    return await promisify<T>(this.http.put<T>(await this.addOrigin(relativeUrl), body, this.options));
  }

  public async delete<T>(relativeUrl: string) {
    return await promisify<T>(this.http.delete<T>(await this.addOrigin(relativeUrl), this.options));
  }

  private async addOrigin(relativeUrl): Promise<string> {
    const backendOrigin = await this.backend.getBackendOrigin();
    return backendOrigin + relativeUrl;
  }

}
