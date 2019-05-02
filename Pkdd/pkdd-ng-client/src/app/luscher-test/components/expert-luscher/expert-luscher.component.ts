import { Component, OnInit } from '@angular/core';
import { ResultsProviderService } from 'src/app/test/services/results-provider.service';
import { RouteDataProviderService } from 'src/app/core/services/route-data-provider.service';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { LuscherResult } from 'src/app/models/persons/results/luscher-result';

@Component({
  selector: 'pkdd-expert-luscher',
  templateUrl: './expert-luscher.component.html',
  styleUrls: ['./expert-luscher.component.scss'],
  providers: [RouteDataProviderService]
})
export class ExpertLuscherComponent implements OnInit {

  public result!: TestResult;

  constructor(
    private readonly data: RouteDataProviderService,
    private readonly provider: ResultsProviderService,
  ) { }

  async ngOnInit() {
    this.result = await this.data.get<TestResult>('results');
    console.log(this.result);
  }

  public async onDelete() {
    this.result = await this.provider.send({
      ...this.result,
      luscherComplete: false,
    });
  }

  public async onComplete(luscherResult: LuscherResult) {
    this.result = await this.provider.send({
      ...this.result,
      luscher: luscherResult,
      luscherComplete: true
    });
  }

}
