import { Injectable } from '@angular/core';

@Injectable(
  // {
  // providedIn: 'root'
  // }
)
export class SearchService {

  constructor() { }

  public search<T>(array: T[], query: string) {
    return array.filter(elem => JSON.stringify(elem).includes(query));
  }
}
