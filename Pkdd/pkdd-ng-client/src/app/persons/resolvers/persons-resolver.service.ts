import { Injectable } from '@angular/core';
import { Person } from '../../models/entities/person';
import { Resolve } from '@angular/router';
import { ServerDataStorageService } from '../../core/services/server-data-storage.service';
import { PkddHttpService } from '../../core/services/pkdd-http.service';
import { MenuService } from 'src/app/core/services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class PersonsResolverService implements Resolve<Person[]> {

  constructor(
    private readonly menu: MenuService,
    private readonly storage: ServerDataStorageService
  ) { }

  public async resolve() {
    const persons = await this.storage.getPersons();

    // persons.sort((a, b) => a.timeTrack.created.getTime() - b.timeTrack.created.getTime());
    this.menu.sideMenuItems = null;
    return persons;
  }

}
