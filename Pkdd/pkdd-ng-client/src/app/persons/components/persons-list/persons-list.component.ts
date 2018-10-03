import { Component, OnInit } from '@angular/core';
import { ContentBlock } from '../../../models/entities/content-block';
import { PkddHttpService } from '../../../core/services/pkdd-http.service';
import { Person } from '../../../models/entities/person';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerDataStorageService } from '../../../core/services/server-data-storage.service';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';

@Component({
  selector: 'pkdd-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
  providers: [RouteDataProviderService]
})
export class PersonsListComponent implements OnInit {
  persons: any[];

  public persons: Person[];
  public blocks: ContentBlock[];

  constructor(
    public хттп: PkddHttpService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storage: ServerDataStorageService,
    private readonly data: RouteDataProviderService
  ) { }

  async ngOnInit() {
    this.persons = await this.data.get<Person[]>('persons');

    if (this.persons && this.persons.length) {
      for (let i = 0; i < 50; i++) {
        this.persons.push(this.persons[0]);
      }
      this.persons[0].name = 'Дональд Алексеич Трамп';
    }
  }

  public async onAdd() {
    const person = this.persons[1]; // await this.storage.addPerson(new Person());
    this.router.navigate([`persons/${person.id}/edit`]);
  }

}
