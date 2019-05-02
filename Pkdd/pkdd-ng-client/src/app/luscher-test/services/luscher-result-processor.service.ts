import { Injectable } from '@angular/core';
import { LuscherResult } from 'src/app/models/persons/results/luscher-result';
import { colorsNames } from '../data/colors';

@Injectable({
  providedIn: 'root'
})
export class LuscherResultProcessorService {

  constructor() { }

  getAverage(results: LuscherResult[]) {
    const average = {} as LuscherResult;

    for (const colorName of colorsNames) {
      average[colorName] = results.map(r => r[colorName]).reduce((acc, cur) => acc += cur, 0) / results.length;
    }

    return average;
  }
}
