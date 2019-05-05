import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TestResult } from 'src/app/models/persons/results/test-result';
import { PhysiognomyResultProcessorService } from '../../services/physiognomy-result-processor.service';
import { Group } from 'src/app/models/persons/results/physiognomy-result';

@Component({
  selector: 'pkdd-tech-physiognomy',
  templateUrl: './tech-physiognomy.component.html',
  styleUrls: ['./tech-physiognomy.component.scss']
})
export class TechPhysiognomyComponent implements OnChanges {

  @Input()
  public results: TestResult[];
  public topGroups: Group[];

  constructor(
    public readonly processor: PhysiognomyResultProcessorService
  ) { }

  public ngOnChanges() {
    const physiognomyResults = this.results.filter(r => r.physiognomyComplete).map(r => r.physiognomy);
    const average = this.processor.average(physiognomyResults);
    this.topGroups = this.processor.topGroups(average);
  }

}
