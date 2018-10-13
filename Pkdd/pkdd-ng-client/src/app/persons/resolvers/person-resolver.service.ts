import { PersonResolverModel } from './resolvers-models/person-resolver-model';
import { Injectable } from '@angular/core';
import { ServerDataStorageService } from '../../core/services/server-data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonResolverService implements Resolve<PersonResolverModel> {

  constructor(
    private readonly _storage: ServerDataStorageService
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<PersonResolverModel> {
    const id = +route.paramMap.get('id');
    const person = await this._storage.getPerson(id);
    const blocks = await this._storage.getContentBlocks(person.bioBlock.id);
    return { person: person, contentBlocks: blocks.entity };
  }
}
