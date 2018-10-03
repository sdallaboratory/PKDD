import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable()
export class RouteDataProviderService {

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  async get<T>(name: string): Promise<T> {
    const data = await this.route.data.pipe(first()).toPromise();
    return data[name];
  }
}
