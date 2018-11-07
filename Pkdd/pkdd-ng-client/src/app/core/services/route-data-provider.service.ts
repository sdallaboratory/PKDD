import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { promisify } from '../utils/promisify';

@Injectable()
export class RouteDataProviderService {

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  async get<T>(name: string): Promise<T> {
    const data = await this.route.data.pipe(first()).toPromise();
    // const data = await promisify(this.route.data);
    return data[name];
  }
}
