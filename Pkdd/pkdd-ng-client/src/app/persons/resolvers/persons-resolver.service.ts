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
    private readonly хттп: PkddHttpService,
    private readonly storage: ServerDataStorageService
  ) { }

  // public async resolve() {
  //   // TODO: fetch data through PersonProviderService
  //   const persons = await this.хттп.get<Person[]>('/api/persons');
  //   this.menu.sideMenuItems = null;
  //   private readonly storage: ServerDataStorageService,
  // ) { }

  public async resolve() {
    // TODO: fetch data through ServerDataStorageServicec
    const persons = await this.storage.getPersons();
    return persons;
  }

}
