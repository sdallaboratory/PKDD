import { Injectable } from '@angular/core';

@Injectable(
  // {
  // providedIn: 'root'
  // }
)
export class SearchService {

  constructor() { }

  public search<T>(array: T[], query: string) {
    const queryWords = query.toLowerCase().split(' ');
    return array.filter(elem => this.isMatched(elem, queryWords));
  }

  private isMatched(elem: any, queryWords: string[]) {
    const stringified = JSON.stringify(elem).toLowerCase();
    const matched = queryWords.every(queryWord => stringified.includes(queryWord));
    return matched;
  }
}
