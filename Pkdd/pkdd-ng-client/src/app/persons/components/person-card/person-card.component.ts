import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../models/entities/person';

@Component({
  selector: 'pkdd-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  @Input()
  public person: Person;

  constructor() { }

  ngOnInit() {
  }

}
