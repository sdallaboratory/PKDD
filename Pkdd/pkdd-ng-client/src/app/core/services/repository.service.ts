import { ContentBlock } from './../../models/entities/content-block';
import { isNullOrUndefined } from 'util';
import { Person } from './../../models/entities/person';
import { LocalStorageService } from './local-storage.service';
import { ServerDataStorageService } from './server-data-storage.service';
import { Injectable } from '@angular/core';
import { ILocalStorage } from '../../models/entities/interfaces/local-storage';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private readonly _localStorage: ILocalStorage;

  private readonly UNIX_ONE_DAY = 60 * 60 * 24;

  constructor(
    private readonly _serverStorage: ServerDataStorageService,
    localStorage: LocalStorageService
  ) {
    this._localStorage = localStorage;
  }

  private _persons: Person[];
  public async getPersons() {
    if (!isNullOrUndefined(this._persons)) {
      return this._persons;
    }
    const localPersons = this._localStorage.getPersons().map(p => p.entity);
    const isNeedToUpdate = this.needToUpdate(this._localStorage.getAveragePersonsCacheTime());
    if (isNullOrUndefined(localPersons) || localPersons.length === 0 || isNeedToUpdate) {
      const serverPersons = await this._serverStorage.getPersons(isNeedToUpdate);
      this._localStorage.addPersons(serverPersons);
      this._persons = this._localStorage.getPersons().map(p => p.entity);
    } else {
      this._persons = localPersons;
    }
    return this._persons;
  }

  private async getPerson(id: number) {
    if (isNullOrUndefined(this._persons) || this._persons.length === 0) {
      const person = await this._serverStorage.getPerson(id);
      this._persons = [].concat(person);
      return person;
    }
    let result = this._persons.find(p => p.id === id);
    if (!isNullOrUndefined(result)) {
      return result;
    }
    result = this._localStorage.getPerson(id).entity;
    const isNeedToUpdate = this.needToUpdate(this._localStorage.getPersonCacheTime(id));
    if (isNullOrUndefined(result) || isNeedToUpdate) {
      const serverPerson = await this._serverStorage.getPerson(id, isNeedToUpdate);
      if (isNeedToUpdate && isNullOrUndefined(result)) {
        this._localStorage.deletePersons([result]);
      }
      this._localStorage.addPersons([serverPerson]);
      result = this._localStorage.getPerson(id).entity;
    }
    return result;
  }

  private _contentBlocks: ContentBlock[];
  public async getContentBlock(bioBlockId: number) {
    if (!isNullOrUndefined(this._contentBlocks)) {
      return this._contentBlocks;
    }
    const localBlocks = this._localStorage.getContentBlocks(bioBlockId);
    const isNeedToUpdate = this.needToUpdate(this._localStorage.getContentBlocksCacheTime(bioBlockId));
    if (isNullOrUndefined(localBlocks) || localBlocks.length === 0 || isNeedToUpdate) {
      const serverBlocks = await this._serverStorage.getContentBlocks(bioBlockId, isNeedToUpdate);
      if (isNeedToUpdate) {
        this._localStorage.deleteContentBlocks(bioBlockId, localBlocks);
      }
      this._localStorage.addContentBlocks(bioBlockId, serverBlocks, null);
      this._contentBlocks = this._localStorage.getContentBlocks(bioBlockId);
    } else {
      this._contentBlocks = localBlocks;
    }
    return this._contentBlocks;
  }

  public addPerson(person: Person) {
    this._localStorage.addPersons([person]);
  }

  public deletePerson(personId: number) {
    this._localStorage.deletePersons([personId]);
  }

  public addContentBlock(bioblockId: number, block: ContentBlock, parentId: number | null = null) {
    this._localStorage.addContentBlocks(bioblockId, [block], parentId);
  }

  public deleteContentBlock(bioBlocId, id: number) {
    this._localStorage.deleteContentBlocks(bioBlocId, [id]);
  }

  /**
   * updateData
   * Very important method. It deletes, updates and adds server data
   */
  public updateData() {
  }

  private async addData() {
    const serverPersons = (await this._serverStorage.getPersons()).map(p => p.id);
    const personsToAdd = this._localStorage.getPersons().filter(p => !serverPersons.includes(p.id)).map(p => p.entity);
  }

  private needToUpdate(time: number | null) {
    return isNullOrUndefined(time) ? false : ((Date.now() / 1000) - time) > this.UNIX_ONE_DAY ? true : false;
  }
}
