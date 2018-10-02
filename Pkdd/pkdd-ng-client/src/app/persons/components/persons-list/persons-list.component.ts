import { Component, OnInit } from '@angular/core';
import { ContentBlock } from '../../../models/entities/content-block';
import { PkddHttpService } from '../../../core/services/pkdd-http.service';
import { Person } from '../../../models/entities/person';

@Component({
  selector: 'pkdd-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {
  persons: any[];

  constructor(
    public хттп: PkddHttpService
  ) { }

  async ngOnInit() {
    // this.persons = await this.repository.getPersons();
    this.persons = await this.хттп.get<Person[]>('/api/persons');
    if (this.persons && this.persons.length) {
      for (let i = 0; i < 50; i++) {
        this.persons.push(this.persons[0]);
      }
    }
  }

}
