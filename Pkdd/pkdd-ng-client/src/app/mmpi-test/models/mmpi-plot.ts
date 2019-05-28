import { ChartDataSets } from 'chart.js';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { ResultProcessorService } from './services/result-processor.service';
import { EventEmitter } from '@angular/core';

export abstract class MmpiPlot {

    // dirty turn against DI
    protected readonly processor = new ResultProcessorService();

    public abstract type: 'individual' | 'total';

    public abstract label: string;

    protected dataset: ChartDataSets = {
        pointRadius: 4,
        pointHoverRadius: 7,
        fill: false,
    };

    public settingsChanged: EventEmitter<void> = new EventEmitter();

    private _hidden = false;
    public get hidden(): boolean {
        return this._hidden;
    }
    public set hidden(v: boolean) {
        this._hidden = v;
        this.settingsChanged.emit();
    }

    private _color: string;
    public get color(): string {
        return this._color;
    }
    public set color(v: string) {
        this._color = v;
        this.settingsChanged.emit();
    }

    private _borderWidth = 6;
    public get borderWidth(): number {
        return this._borderWidth;
    }
    public set borderWidth(v: number) {
        this._borderWidth = v;
        this.settingsChanged.emit();
    }

    public getDatasets(results: TestResult[]): ChartDataSets[] {
        this.dataset.lineTension = 0;
        this.dataset.hidden = this.hidden;
        this.dataset.borderWidth = this.borderWidth;
        this.dataset.borderColor = this.color;
        this.dataset.backgroundColor = this.color;
        this.dataset.pointBackgroundColor = this.color;
        this.dataset.pointBorderColor = this.color;
        return [this.dataset];
    }
}
