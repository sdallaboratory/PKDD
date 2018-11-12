import { Injectable, EventEmitter } from '@angular/core';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { PkddHttpService } from 'src/app/core/services/pkdd-http.service';
import { ResultsProviderService } from './results-provider.service';

@Injectable()
export class RealtimeResultService {

  constructor(
    private readonly provider: ResultsProviderService
  ) { }

  public getEmitter(personId: number) {
    const emitter = new ResultEmitter(personId, this.provider);
    this.emitters.push(emitter);
    return emitter;
  }

  public readonly emitters: ResultEmitter[] = [];

}

export class ResultEmitter {

  public results: TestResult[];
  private timer: any;

  public readonly onChanged: EventEmitter<TestResult[]> = new EventEmitter();

  constructor(
    public readonly personId: number,
    private readonly provider: ResultsProviderService
  ) { }

  public start(): ResultEmitter {
    this.onTimer();
    this.timer = setInterval(() => this.onTimer(), 10000);
    return this;
  }

  private async onTimer(): Promise<void> {
    try {
      this.results = await this.provider.getForPerson(this.personId);
      this.onChanged.emit(this.results);
    } catch { }
  }

  public stop(): ResultEmitter {
    clearInterval(this.timer);
    return this;
  }

}
