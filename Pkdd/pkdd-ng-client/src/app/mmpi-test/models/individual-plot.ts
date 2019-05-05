import { MmpiPlot } from './mmpi-plot';
import { ChartDataSets } from 'chart.js';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { PkddUser } from 'src/app/models/auth/pkdd-user';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';

export class IndividualPlot extends MmpiPlot {

    public type: 'individual' | 'total' = 'individual';

    public readonly label: string;

    constructor(public readonly expert: PkddUser) {
        super();
        this.expert = expert;
        this.label = expert.name;
        this.dataset.label = this.label;
    }

    public getDatasets(results: TestResult[]): ChartDataSets[] {
        const expertResult = results.find(r => r.userInfo.id === this.expert.id);
        if (!expertResult || !expertResult.mmpiComplete) {
            return null;
        }
        super.getDatasets(results);
        this.dataset.data = MmpiResult.toArray(expertResult.mmpi);
        return [this.dataset];
    }

}
