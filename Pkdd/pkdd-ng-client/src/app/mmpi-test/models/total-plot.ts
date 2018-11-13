import { MmpiPlot } from './mmpi-plot';
import { ChartDataSets } from 'chart.js';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';
import { ReductionStrategies } from './reduction-strategies';
import { PkddUser } from 'src/app/models/auth/pkdd-user';

export class TotalPlot extends MmpiPlot {

    public type: 'individual' | 'total' = 'total';

    public readonly label: string;

    public usedExperts: PkddUser[];

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

        const mmpiResults = results.filter(r => r.mmpiComplete).map(r => r.mmpi);

        const percentedResults = this.processor.dropMarginals(mmpiResults, this.percent);

        this.usedExperts = results.filter(r => percentedResults.includes(r.mmpi)).map(r => r.userInfo);
        console.log(this.usedExperts);

        switch (this.strategy) {
            case ReductionStrategies.average:
                this.dataset.data = MmpiResult.toArray(this.processor.average(percentedResults));
                break;
            case ReductionStrategies.median:
                this.dataset.data = MmpiResult.toArray(this.processor.median(percentedResults));
                break;
            case ReductionStrategies.root:
                this.dataset.data = MmpiResult.toArray(this.processor.root(percentedResults));
                break;
        }
        return this.dataset;
    }

}
