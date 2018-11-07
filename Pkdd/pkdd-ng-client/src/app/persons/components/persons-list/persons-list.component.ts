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

  public persons: Person[];
  public blocks: ContentBlock[];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storage: ServerDataStorageService,
    private readonly data: RouteDataProviderService
  ) { }

  async ngOnInit() {
    this.persons = await this.data.get<Person[]>('persons');
  }

  public async onAdd() {
    const person = await this.storage.addPerson();
    this.router.navigate([`persons/${person.id}/edit`]);
  }

}
