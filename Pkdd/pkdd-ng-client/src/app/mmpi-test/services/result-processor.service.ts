import { Injectable } from '@angular/core';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';

@Injectable({
  providedIn: 'root'
})
export class ResultProcessorService {

  constructor() { }

  public average(results: MmpiResult[]): MmpiResult {
    if (!results || !results.length) {
      return null;
    }

    const transposed = this.getColumns(results);
    const averageArray = transposed.map(column => this.sum(column) / column.length);
    return MmpiResult.fromArray(averageArray);
  }

  public root(results: MmpiResult[]): MmpiResult {
    if (!results || !results.length) {
      return null;
    }

    const transposed = this.getColumns(results);
    const rootArray = transposed.map(column => Math.sqrt(this.sum(column.map(value => value * value)) / column.length));
    return MmpiResult.fromArray(rootArray);
  }

  public median(results: MmpiResult[]): MmpiResult {
    if (!results || !results.length) {
      return null;
    }

    const transposed = this.getColumns(results);

    const medianArray = transposed.map(column => this.getMedian(column));
    return MmpiResult.fromArray(medianArray);
  }

  getMedian(array: number[]): number {
    const sortedArray = this.sort(array);
    if (sortedArray.length % 2 === 0) {
      return (sortedArray[sortedArray.length / 2] + sortedArray[sortedArray.length / 2 - 1]) / 2;
    } else {
      return sortedArray[Math.round(sortedArray.length / 2) - 1];
    }
  }

  private sort(array: number[]): number[] {
    return array.sort((a, b) => a - b);
  }

  private sum(values: number[]): number {
    let result = 0;
    values.forEach(value => {
      result += value;
    });
    return result;
  }

  private getColumns(results: MmpiResult[]): number[][] {
    const arrays = results.map(r => MmpiResult.toArray(r));
    const transposed = this.transpose(arrays);
    return transposed;
  }

  transpose(sourceArray: number[][]): number[][] {
    const result = [];
    for (let i = 0; i < sourceArray.length; i++) {
      for (let j = 0; j < sourceArray[i].length; j++) {
        if (!result[j]) {
          result[j] = [];
        }
        result[j].push(sourceArray[i][j]);
      }
    }
    return result;
  }

  getRootDifference(a: MmpiResult, b: MmpiResult): number {
    let difference = 0;
    MmpiResult.keys.forEach(key => {
      difference += Math.pow((a[key] - b[key]), 2);
    });
    return difference;
  }

  public getDiviations(results: MmpiResult[]) {
    const average = this.average(results);
    return results.map(r => this.getRootDifference(r, average));
    // const cmp = (a: MmpiResult, b: MmpiResult) => this.getRootDifference(a, average) - this.getRootDifference(b, average);
    // const deviations = results.sort(cmp);
  }

  public dropMarginals(results: MmpiResult[], percent: number) {
    if (percent < 0 || percent > 100) {
      throw new Error('percent value is oit of range from 0 to 100');
    }

    const deviations = this.getDiviations(results).map((d: number, i: number) => ({ result: results[i], deviation: d }));

    deviations.sort((a, b) => a.deviation - b.deviation);

    return deviations.filter((e, i) => i === 0 || i < results.length * percent / 100).map(pair => pair.result);
  }
}
