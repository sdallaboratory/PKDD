import { MmpiPlot } from './mmpi-plot';
import { ChartDataSets } from 'chart.js';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { ReductionStrategies } from './reduction-strategies';

export class TotalPlot extends MmpiPlot {

    public type: 'individual' | 'total' = 'total';

    public readonly label: string;

    constructor(
        public readonly strategy: ReductionStrategies,
        public percent: number = 80
    ) {
        super();
        this.label = strategy;
        this.dataset.label = this.label;
    }

    public getDataset(results: TestResult[]): ChartDataSets {
        super.getDataset(results);
        // TODO: remove marginal results with treshhold
        const mmpiResults = results.filter(r => r.mmpiComplete).map(r => r.mmpi);

        switch (this.strategy) {
            case ReductionStrategies.average:
                this.dataset.data = MmpiResult.toArray(this.processor.average(mmpiResults));
                break;
            case ReductionStrategies.median:
                this.dataset.data = MmpiResult.toArray(this.processor.median(mmpiResults));
                break;
            case ReductionStrategies.root:
                this.dataset.data = MmpiResult.toArray(this.processor.root(mmpiResults));
                break;
        }
        return this.dataset;
    }

}
