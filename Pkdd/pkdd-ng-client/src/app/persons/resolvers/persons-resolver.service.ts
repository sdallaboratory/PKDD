import { Injectable } from '@angular/core';
import { Person } from '../../models/entities/person';
import { Resolve } from '@angular/router';
import { ServerDataStorageService } from '../../core/services/server-data-storage.service';
import { PkddHttpService } from '../../core/services/pkdd-http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonsResolverService implements Resolve<Person[]> {

  constructor(
    private readonly storage: ServerDataStorageService,
    private readonly хттп: PkddHttpService
  ) { }

  public async resolve() {
    // TODO: fetch data through ServerDataStorageServicec
    const persons = await this.хттп.get<Person[]>('/api/persons');
    return persons;
  }

}
