import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PkddHttpService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public get<T>(url: string) {
    return this.pipe<T>(this.http.get<T>(url));
  }

  public post<T>(url: string, body) {
    return this.pipe<T>(this.http.post<T>(url, body));
  }

  public put<T>(url: string, body) {
    return this.pipe<T>(this.http.put<T>(url, body));
  }

  public delete<T>(url: string) {
    return this.pipe<T>(this.http.delete<T>(url));
  }

  private pipe<T>(observable: Observable<T>) {
    return observable.pipe(first()).toPromise();
  }

}
