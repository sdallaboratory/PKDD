import { Component, OnInit } from '@angular/core';
import { PhysiognomyResult } from 'src/app/models/persons/results/physiognomy-result';
import { Person } from 'src/app/models/entities/person';
import { ActivatedRoute } from '@angular/router';
import { ResultsProviderService } from 'src/app/test/services/results-provider.service';
import { TestResult } from 'src/app/models/persons/results/test-result';

@Component({
  selector: 'pkdd-expert-physiognomy',
  templateUrl: './expert-physiognomy.component.html',
  styleUrls: ['./expert-physiognomy.component.scss']
})
export class ExpertPhysiognomyComponent implements OnInit {


  public result: TestResult;
  public person: Person;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly provider: ResultsProviderService,
  ) { }


  ngOnInit() {
    this.person = this.route.snapshot.data['personModel'].person;
    this.result = this.route.snapshot.data['results']; // await this.data.get<TestResult>('results');
  }

  public async onDelete() {
    this.result = await this.provider.send({
      ...this.result,
      physiognomyComplete: false,
    });
  }

  public async onComplete(physiognomyResult: PhysiognomyResult) {
    this.result = await this.provider.send({
      ...this.result,
      physiognomy: physiognomyResult,
      physiognomyComplete: true
    });
  }
}
