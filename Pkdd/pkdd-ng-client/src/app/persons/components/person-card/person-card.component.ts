import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../models/entities/person';
import { ServerDataStorageService } from '../../../core/services/server-data-storage.service';

@Component({
  selector: 'pkdd-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  @Input()
  public person: Person;

  constructor(
    private readonly storage: ServerDataStorageService
  ) { }

  ngOnInit() {
  }

  public onDelete() {
    this.storage.deletePerson(this.person.id);
  }
}
