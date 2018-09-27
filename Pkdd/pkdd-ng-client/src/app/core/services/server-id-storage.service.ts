import { EntityScanner } from './../utils/entity-scanner';
import { Injectable } from '@angular/core';
import { Person } from '../../models/entities/person';
import { TypeChecker } from '../utils/type-checker';
import { isNullOrUndefined } from 'util';
import { ContentBlock } from '../../models/entities/content-block';

@Injectable({
  providedIn: 'root'
})
export class ServerIdStorageService {

  private _personsIds: number[] = [];
  public get personsIds() {
    return [].concat(this._personsIds);
  }

  private _blocksIds: BlockDictionary[] = [];
  public get blocksIds() {
    return [].concat(this._blocksIds) as BlockDictionary[];
  }

  private _personsIdsToDelete: number[] = [];
  public get personsIdsToDelete() {
    return [].concat(this._personsIdsToDelete);
  }

  private _blocksIdsToDelete: BlockDictionary[] = [];
  public get blocksIdsToDelete():  BlockDictionary[] {
    return [].concat(this._blocksIdsToDelete) as BlockDictionary[];
  }

  public constructor() {
    // very stupid. Needs to rework
    try {
      this._personsIds = JSON.parse(localStorage[IdType.Person]);
    } catch {
      this._personsIds = [];
    }

    try {
      this._personsIdsToDelete = JSON.parse(localStorage[IdType.PersonDelete]);
    } catch (error) {
      this._personsIdsToDelete = [];
    }

    try {
      this._blocksIds = JSON.parse(localStorage[IdType.Block]);
    } catch (error) {
      this._blocksIds = [];
    }

    try {
      this._blocksIdsToDelete = JSON.parse(localStorage[IdType.BlockDelete]);
    } catch (error) {
      this._blocksIdsToDelete = [];
    }
  }

  public isInPersons(id: number | number[]) {
    return TypeChecker.isIterable(id) ? id.every(item =>
      this._personsIds.includes(item))
      : this._personsIds.includes(id);
  }

  public isInPersonsToDelete(id: number | number[]) {
    return TypeChecker.isIterable(id) ? id.every(item =>
      this._personsIdsToDelete.includes(item))
      : this._personsIdsToDelete.includes(id);
  }

  public isInBlocks(id: number | number[]) {
    return TypeChecker.isIterable(id) ? id.every(item =>
      this.blocksIds.map(b => b.blockId).includes(item))
      : this.blocksIds.map(b => b.blockId).includes(id);
  }

  public isInBlocksToDelete(id: number | number[]) {
    return TypeChecker.isIterable(id) ? id.every(item =>
      this.blocksIdsToDelete.map(b => b.blockId).includes(item))
      : this.blocksIdsToDelete.map(b => b.blockId).includes(id);
  }

  public deletePersonIds(persons: number[] | Person[]) {
    if (isNullOrUndefined(persons) || persons.length === 0) {
      return;
    }
    let ids = TypeChecker.isNumberArray(persons) ? persons : persons.map(p => p.id);
    ids = ids.filter(id => this._personsIds.includes(id) && !this._personsIdsToDelete.includes(id));
    if (ids.length === 0) {
      return;
    }
    ids.forEach(id => this._personsIds.splice(this._personsIds.findIndex(i => i === id), 1));
    this._personsIds = this._personsIds.concat(ids);
    this.savePersonsIds();
  }

  public deleteBlocksIds(baseId: number, blocks: number[] | ContentBlock[]) {
    if (isNullOrUndefined(blocks) || blocks.length === 0) {
      return;
    }
    let ids = TypeChecker.isNumberArray(blocks) ? blocks : blocks.map(p => p.id);
    ids = ids.filter(id =>
      this._blocksIds.map(b => b.blockId).includes(id)
      && !this._blocksIdsToDelete.map(b => b.blockId).includes(id));
    if (ids.length === 0) {
      return;
    }
    ids.forEach(id => this._blocksIds.splice(this._blocksIds.map(b => b.blockId).findIndex(i => i === id), 1));
    this._blocksIds = this.blocksIds.concat(ids.map(id => new BlockDictionary(baseId, id)));
    this.saveBlocksIds();
  }

  public updatePersonsIds(persons: number[] | Person[]) {
    if (isNullOrUndefined(persons) || persons.length === 0) {
      return;
    }
    const ids = TypeChecker.isNumberArray(persons) ? persons : persons.map(p => p.id);
    this._personsIdsToDelete = this._personsIdsToDelete.filter(id => ids.includes(id));
    this._personsIds = EntityScanner.newEntity(ids.filter(id => !this._personsIdsToDelete.includes(id)));
    this.savePersonsIds();
  }

  public updatePersonId(person: number | Person) {
    if (isNullOrUndefined(person)) {
      return;
    }
    const id = TypeChecker.isNumber(person) ? person : person.id;
    if (!this._personsIdsToDelete.includes(id)) {
      this._personsIds.push(id);
    }
    this.savePersonsIds();
  }

  public updateBlocksIds(baseId: number, blocks: ContentBlock[]) {
    if (isNullOrUndefined(blocks) || blocks.length === 0) {
      return;
    }
    const ids = TypeChecker.isNumberArray(blocks) ? blocks : blocks.map(b => b.id);
    this._blocksIdsToDelete = this.blocksIdsToDelete.filter(id => id.baseId === baseId && ids.includes(id.blockId));
    this._blocksIds = EntityScanner.newEntity(
      ids.filter(
        id => !this.blocksIdsToDelete.map(b => b.blockId).includes(id)).map(b => new BlockDictionary(baseId, b)));
    this.saveBlocksIds();
  }

  public savePersonsIds() {
    localStorage[IdType.Person] = JSON.stringify(this._personsIds);
    localStorage[IdType.PersonDelete] = JSON.stringify(this._personsIdsToDelete);
  }

  public saveBlocksIds() {
    localStorage[IdType.Block] = JSON.stringify(this._blocksIds);
    localStorage[IdType.BlockDelete] = JSON.stringify(this._blocksIdsToDelete);
  }

  public removePersonIds(persons: number[] | Person[]) {
    if (isNullOrUndefined(persons) || persons.length === 0) {
      return;
    }
    let ids = TypeChecker.isNumberArray(persons) ? persons : persons.map(p => p.id);
    ids = ids.filter(id => this._personsIdsToDelete.includes(id));
    if (ids.length === 0) {
      return;
    }
    ids.forEach(id => this._personsIdsToDelete.splice(id, 1));
    this._personsIds = this._personsIds.concat(ids);
    this.savePersonsIds();
  }

  public removeBlocksIds(baseId: number, blocks: number[] | ContentBlock[]) {
    if (isNullOrUndefined(blocks) || blocks.length === 0) {
      return;
    }
    let ids = TypeChecker.isNumberArray(blocks) ? blocks : blocks.map(p => p.id);
    ids = ids.filter(id => this._blocksIdsToDelete.map(b => b.blockId).includes(id));
    if (ids.length === 0) {
      return;
    }
    ids.forEach(id => this._blocksIdsToDelete.splice(id, 1));
    this._blocksIds = this.blocksIds.concat(ids.map(id => new BlockDictionary(baseId, id)));
    this.saveBlocksIds();
  }

}

class BlockDictionary {
  baseId: number;
  blockId: number;
  constructor (baseId: number, id: number) {
    this.baseId = baseId;
    this.blockId = id;
  }
}

enum IdType {
  Person = 'PersonId',
  Block = 'BlockId',
  PersonDelete = 'PersonDeleteId',
  BlockDelete = 'BlockDeleteId',
}
