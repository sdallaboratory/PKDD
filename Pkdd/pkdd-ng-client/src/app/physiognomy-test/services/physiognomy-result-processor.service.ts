import { Injectable } from '@angular/core';
import { PhysiognomyResult, Group, emptyPhysiognomyResult } from 'src/app/models/persons/results/physiognomy-result';

@Injectable({
  providedIn: 'root'
})
export class PhysiognomyResultProcessorService {

  constructor() { }

  public topGroups(result: PhysiognomyResult): Group[] {
    const max = Math.max(...Object.values(result));
    const filtered = Object.keys(result).filter(k => result[k] === max) as Group[];
    return filtered;
  }

  public average(results: PhysiognomyResult[]) {
    const average = {} as PhysiognomyResult;
    for (const colorName of Object.keys(emptyPhysiognomyResult)) {
      average[colorName] = results.map(r => r[colorName]).reduce((acc, cur) => acc += cur, 0) / results.length;
    }
    return average;
  }
}
