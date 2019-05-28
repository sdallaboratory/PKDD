import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LuscherResult, ColorName } from 'src/app/models/persons/results/luscher-result';
import { colors } from '../../data/colors';
import { Person } from 'src/app/models/entities/person';

@Component({
  selector: 'pkdd-luscher-test',
  templateUrl: './luscher-test.component.html',
  styleUrls: ['./luscher-test.component.scss']
})
export class LuscherTestComponent implements OnInit {

  @Input()
  public person: Person;

  @Output()
  public readonly complete = new EventEmitter<LuscherResult>();

  public index = 0;

  public testSequence: ColorName[][] = [];
  public chosedColors: ColorName[] = [];
  public colors = colors;
  public result: LuscherResult;
  public colorNames = Object.keys(colors) as ColorName[];

  constructor() { }

  ngOnInit() {
    this.generateSequence();
  }

  private generateSequence() {
    for (let i = 0; i < this.colorNames.length; i++) {
      for (let j = i + 1; j < this.colorNames.length; j++) {
        const comparison = [this.colorNames[i], this.colorNames[j]].sort(() => Math.random() - 0.5);
        this.testSequence.push(comparison);
      }
    }
    this.testSequence.sort(() => Math.random() - 0.5);
  }

  public onColorClick(colorName: ColorName) {
    this.chosedColors.push(colorName);
    if (this.index < this.testSequence.length - 1) {
      this.index++;
    } else {
      this.result = {} as LuscherResult;
      for (const name of this.colorNames) {
        // TODO: Strange shit. how to merge results.
        this.result[name] = this.chosedColors.filter(c => c === name).length / (this.colorNames.length - 1);
      }
      this.complete.emit(this.result);
    }
  }

}
