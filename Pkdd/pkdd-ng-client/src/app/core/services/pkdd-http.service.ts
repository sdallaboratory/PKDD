import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { last, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { PkddUser } from '../../models/auth/pkdd-user';

@Injectable({
  providedIn: 'root'
})
export class PkddHttpService {

  private readonly options: { withCredentials: boolean, headers: {}};

  constructor(
    private readonly http: HttpClient,
    private readonly env: EnvironmentService
  ) {
    if (!env.config.production) {
      this.options = { withCredentials: true, headers: { 'crossDomain': 'true' } };
    }
  }

  public get<T>(url: string) {
    return this.pipe<T>(this.http.get<T>(this.env.config.backendOrigin + url, this.options));
  }

  public post<T>(url: string, body) {
    return this.pipe<T>(this.http.post<T>(this.env.config.backendOrigin + url, body, this.options));
  }

  public put<T>(url: string, body) {
    return this.pipe<T>(this.http.put<T>(this.env.config.backendOrigin + url, body, this.options));
  }

  public delete<T>(url: string) {
    return this.pipe<T>(this.http.delete<T>(this.env.config.backendOrigin + url, this.options));
  }

  private pipe<T>(observable: Observable<T>) {
    return observable.pipe(last(), map(value => {
      console.log(value);
      return value;
    })).toPromise();
  }

}
