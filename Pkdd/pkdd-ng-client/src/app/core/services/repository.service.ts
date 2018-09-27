import { ContentBlock } from './../../models/entities/content-block';
import { isNullOrUndefined } from 'util';
import { Person } from './../../models/entities/person';
import { LocalStorageService } from './local-storage.service';
import { ServerDataStorageService } from './server-data-storage.service';
import { Injectable } from '@angular/core';
import { ILocalStorage } from '../../models/entities/interfaces/local-storage';
import { ServerIdStorageService } from './server-id-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private readonly _localStorage: ILocalStorage;

  constructor(
    private readonly _serverStorage: ServerDataStorageService,
    private readonly _idsStorage: ServerIdStorageService,
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
    const serverPersons = await this._serverStorage.getPersons();
    if (serverPersons.fromServer) {
      this._idsStorage.updatePersonsIds(serverPersons.entity);
    }
    this._persons = serverPersons.entity.concat(localPersons).filter(p => !isNullOrUndefined(p));
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
    if (isNullOrUndefined(result)) {
      const response = await this._serverStorage.getPerson(id);
      result = response.entity;
      if (response.fromServer) {
        this._idsStorage.updatePersonId(result);
      }
    }
    return result;
  }

  private _contentBlocks: ContentBlock[];
  public async getContentBlock(bioBlockId: number) {
    if (!isNullOrUndefined(this._contentBlocks)) {
      return this._contentBlocks;
    }
    const localBlocks = this._localStorage.getContentBlocks(bioBlockId);
    const serverBlocks = await this._serverStorage.getContentBlocks(bioBlockId);
    if (serverBlocks.fromServer) {
      let blocks = [];
      serverBlocks.entity.entity.forEach(b => blocks = blocks.concat(ContentBlock.inRow(b)));
      blocks = blocks.filter(b => !isNullOrUndefined(b));
      this._idsStorage.updateBlocksIds(bioBlockId, blocks.concat(serverBlocks.entity.entity));
    }
    return serverBlocks.entity.entity.concat(localBlocks).filter(b => !isNullOrUndefined(b));
  }

  public addPerson(person: Person) {
    this._localStorage.addPersons([person]);
  }

  public deletePerson(personId: number) {
    if (this._idsStorage.isInPersons(personId)) {
      this._idsStorage.deletePersonIds([personId]);
    } else {
      this._localStorage.deletePersons([personId]);
    }
  }

  public addContentBlock(bioblockId: number, block: ContentBlock, parentId: number | null = null) {
    this._localStorage.addContentBlocks(bioblockId, [block], parentId);
  }

  public deleteContentBlock(bioBlockId: number, id: number) {
    if (this._idsStorage.isInBlocks(id)) {
      this._idsStorage.deleteBlocksIds(bioBlockId, [id]);
    } else {
      this._localStorage.deleteContentBlocks(bioBlockId, [id]);
    }
  }

  /**
   * updateData
   * Very important method. It deletes, updates and adds server data
   */
  public async updateData() {
    await this.addData();
    this.deleteData();
  }

  private deleteData() {
    const promises: Promise<any>[] = [];
    for (let i = 0; i < this._idsStorage.blocksIdsToDelete.length; i++) {
      const item = this._idsStorage.blocksIdsToDelete[i];
      promises.push(this._serverStorage.deleteContentBlock(item.baseId, item.blockId).then(
        () => {
          this._idsStorage.removeBlocksIds(item.baseId, [item.blockId]);
        }
      ));
    }
    Promise.all(promises).then(() => {
      for (let i = 0; i < this._idsStorage.personsIdsToDelete.length; i++) {
        const item = this._idsStorage.personsIdsToDelete[i];
        promises.push(this._serverStorage.deletePerson(item).then(
          () => {
            this._idsStorage.removePersonIds([item.blockId]);
          }
        ));
    }});
  }

  private async addData() {
    const personsToAdd = this._localStorage.getPersons().map(p => p.entity);
    if (!isNullOrUndefined(personsToAdd) && personsToAdd.length > 0) {
      const result: Person[] = [];
      for (let i = 0; i < personsToAdd.length; i++) {
        const person = personsToAdd[i];
        person.bioBlock.contentBlocks = this._localStorage.getContentBlocks(person.bioBlock.id);
        result.push(await this._serverStorage.addPerson(person));
      }
      this.deletePersons(result.filter(p => !isNullOrUndefined(p)));
    }
  }

  private deletePersons(persons: Person[]) {
    if (isNullOrUndefined(persons) || persons.length === 0) {
      return;
    }
    this.deleteContentBlocks(persons);
    this._localStorage.deletePersons(persons);
  }

  private deleteContentBlocks(persons: Person[]) {
    if (isNullOrUndefined(persons) || persons.length === 0) {
      return;
    }
    persons.forEach(p => {
      this._localStorage.deleteContentBlocks(p.bioBlock.id, p.bioBlock.contentBlocks);
    });
  }

}
