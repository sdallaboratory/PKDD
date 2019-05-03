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


    private _percent: number;
    public get percent(): number {
        return this._percent;
    }
    public set percent(v: number) {
        this._percent = v;
        this.settingsChanged.emit();
    }


    constructor(
        public readonly strategy: ReductionStrategies,
        percent: number = 80
    ) {
        super();
        this.label = strategy;
        this.dataset.label = this.label;
        this.percent = percent;
    }

    public getDataset(results: TestResult[]): ChartDataSets {
        super.getDataset(results);

        const mmpiResults = results.filter(r => r.mmpiComplete).map(r => r.mmpi);

        const percentedResults = this.processor.dropMarginals(mmpiResults, this.percent);

        this.usedExperts = results.filter(r => percentedResults.includes(r.mmpi)).map(r => r.userInfo);

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
            case ReductionStrategies.min:
                this.dataset.data = MmpiResult.toArray(this.processor.min(percentedResults));
                break;
            case ReductionStrategies.max:
                this.dataset.data = MmpiResult.toArray(this.processor.max(percentedResults));
                break;
            case ReductionStrategies.harmonic:
                this.dataset.data = MmpiResult.toArray(this.processor.harmonic(percentedResults));
                break;
        }
        return this.dataset;
    }

}
