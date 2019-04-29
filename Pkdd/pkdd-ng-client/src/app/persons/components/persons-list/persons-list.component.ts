import { Component, OnInit } from '@angular/core';
import { ContentBlock } from '../../../models/entities/content-block';
import { PkddHttpService } from '../../../core/services/pkdd-http.service';
import { Person } from '../../../models/entities/person';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerDataStorageService } from '../../../core/services/server-data-storage.service';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { SearchService } from 'src/app/search/services/search.service';

@Component({
  selector: 'pkdd-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
  providers: [RouteDataProviderService]
})
export class PersonsListComponent implements OnInit {

  public query = '';

  public persons: Person[] = [];
  public filteredPersons: Person[] = [];
  public blocks: ContentBlock[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storage: ServerDataStorageService,
    private readonly data: RouteDataProviderService,
    private readonly search: SearchService
  ) { }

  async ngOnInit() {
    this.persons = await this.data.get<Person[]>('persons');
    this.update();
  }

  public async onAdd() {
    const person = await this.storage.addPerson();
    this.router.navigate([`persons/${person.id}/edit`]);
  }

  public update() {
    this.filteredPersons = this.search.search(this.persons, this.query);
  }

  public async onQueryChange(newQuery: string) {
    this.query = newQuery;
    await this.update();
  }

}
