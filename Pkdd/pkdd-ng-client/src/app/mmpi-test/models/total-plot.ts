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

    // TODO: Use Map data structure instead;
    private extraDatasets: ChartDataSets[] = [];


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


    public getDatasets(results: TestResult[]): ChartDataSets[] {
        super.getDatasets(results);

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
            case ReductionStrategies.all:
                this.fillExtraDatasets(percentedResults); // TODO: bring out this shit to a new inheretad class.
                return this.extraDatasets;
        }
        return [this.dataset];
    }

    private fillExtraDatasets(results: MmpiResult[]) {
        for (let i = 0; i < results.length; i++) {
            if (!this.extraDatasets[i]) {
                this.extraDatasets[i] = {
                    pointRadius: 0,
                    fill: false,
                    hidden: this.dataset.hidden,
                    borderWidth: this.dataset.borderWidth,
                    borderColor: this.dataset.borderColor,
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    // backgroundColor: this.dataset.backgroundColor,
                };
            }
            this.extraDatasets[i].data = MmpiResult.toArray(results[i]);
        }
        this.extraDatasets.length = results.length;
    }

}
