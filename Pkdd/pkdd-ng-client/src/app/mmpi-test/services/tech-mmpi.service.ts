import { Injectable } from '@angular/core';
import { MmpiPlot } from '../models/mmpi-plot';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { ChartDataSets } from 'chart.js';
import { remove } from 'src/app/core/utils/remove';

@Injectable()
export class TechMmpiService {

  public add(plot: MmpiPlot) {
    this.plots.push(plot);
  }

  public readonly plots: MmpiPlot[] = [];

  constructor() { }

  public remove(plot: MmpiPlot) {
    remove(this.plots, plot);
  }

  public getDatasets(results: TestResult[]): ChartDataSets[] {
    const datasets: ChartDataSets[] = [];
    this.plots.forEach(plot => {
      const dataset = plot.getDataset(results);
      if (dataset) {
        datasets.push(dataset);
      } else {
        // TODO: Maybe redisign the logic of deleting outdated plots.
        this.remove(plot);
      }
    });
    return datasets;
  }
}
