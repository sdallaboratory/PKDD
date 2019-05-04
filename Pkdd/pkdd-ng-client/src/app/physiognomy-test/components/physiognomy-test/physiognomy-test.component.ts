import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PhysiognomyResult, emptyPhysiognomyResult, Group } from 'src/app/models/persons/results/physiognomy-result';
import { Person } from 'src/app/models/entities/person';

@Component({
  selector: 'pkdd-physiognomy-test',
  templateUrl: './physiognomy-test.component.html',
  styleUrls: ['./physiognomy-test.component.scss']
})
export class PhysiognomyTestComponent implements OnInit {

  @Input()
  public person: Person;

  @Output()
  public complete = new EventEmitter<PhysiognomyResult>();

  public currentResult: PhysiognomyResult = emptyPhysiognomyResult;
  public sequence: Group[][] = [];

  public index = 0;
  constructor() { }

  ngOnInit() {
    this.generateSequence();
  }


  private generateSequence() {
    const keys = Object.keys(emptyPhysiognomyResult) as Group[];
    const occurences = [...keys, ...keys, ...keys]
    let pairs: Group[][];
    do {
      occurences.sort(() => Math.random() - 0.5);
      pairs = occurences.filter((k, i) => i % 2 === 0).map((v, i) => [occurences[i], occurences[i + 1]]);
      console.log(pairs.some(p => p[0] === p[1]));

    } while (pairs.some(p => p[0] === p[1]));
    this.sequence = pairs;
  }
}
