import { Component, OnInit } from '@angular/core';
import { ContentBlock } from '../../../models/entities/content-block';
import { PkddHttpService } from '../../../core/services/pkdd-http.service';
import { Person } from '../../../models/entities/person';
import { Router } from '@angular/router';
import { ServerDataStorageService } from '../../../core/services/server-data-storage.service';

@Component({
  selector: 'pkdd-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {

  public persons: Person[];
  public blocks: ContentBlock[];

  constructor(
    public хттп: PkddHttpService,
    private readonly router: Router,
    private readonly storage: ServerDataStorageService
  ) { }

  async ngOnInit() {
    // this.persons = await this.repository.getPersons();
    this.persons = await this.хттп.get<Person[]>('/api/persons');
    if (this.persons && this.persons.length) {
      for (let i = 0; i < 50; i++) {
        this.persons.push(this.persons[0]);
      }
    }
    this.persons[0].name = 'Дональд Алексеич Трамп';
    // this.persons[2].name = 'Алексей Евпатьевич Щекочихин-Крестовоздвиженский';
    // this.blocks = await this.repository.getContentBlock(this.persons[0].bioBlock.id);
  }

  public async onAdd() {
    const person = this.persons[1]; // await this.storage.addPerson(new Person());
    this.router.navigate([`persons/${this.persons[0].id}/edit`]);
  }

}
