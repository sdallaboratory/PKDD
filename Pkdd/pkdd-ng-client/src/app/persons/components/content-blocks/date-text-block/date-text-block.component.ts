import { DateText } from './../../../../models/entities/content-entities/date-text';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pkdd-date-text-block',
  templateUrl: './date-text-block.component.html',
  styleUrls: ['./date-text-block.component.scss']
})
export class DateTextBlockComponent implements OnInit {

  @Input()
  public content: DateText;

  @Input()
  public edit: boolean;

  constructor() { }

  ngOnInit() {
  }

  public get ValidContent() {
    return this.content && !this.content.text; // || this.content.date.firstDate === null;
  }

}
