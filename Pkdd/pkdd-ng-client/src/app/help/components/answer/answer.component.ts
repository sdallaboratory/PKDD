import { Answer } from './../../models/answer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pkdd-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input()
  public asnwer: Answer;

  constructor() { }

  ngOnInit() {
  }

}
