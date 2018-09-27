import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { PkddUser } from '../../models/auth/pkdd-user';

@Injectable({
  providedIn: 'root'
})
export class PkddHttpService {

  constructor(
    private readonly http: HttpClient,
    private readonly env: EnvironmentService
  ) { }

  public get<T>(url: string) {
    return this.pipe<T>(this.http.get<T>(this.env.config.backendUrl + url));
  }

  public post<T>(url: string, body) {
    return this.pipe<T>(this.http.post<T>(this.env.config.backendUrl + url, body));
  }

  public put<T>(url: string, body) {
    return this.pipe<T>(this.http.put<T>(this.env.config.backendUrl + url, body));
  }

  public delete<T>(url: string) {
    return this.pipe<T>(this.http.delete<T>(this.env.config.backendUrl + url));
  }

  private pipe<T>(observable: Observable<T>) {
    return observable.pipe(first()).toPromise();
  }

}
