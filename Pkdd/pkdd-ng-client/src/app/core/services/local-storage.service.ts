import { BaseBioBlock } from './../../models/entities/base-bio-block';
import { CachedEntity } from './../../models/core/cached-entity';
import { isNullOrUndefined } from 'util';
import { ILocalStorage } from './../../models/entities/interfaces/local-storage';
import { Injectable } from '@angular/core';
import { Person } from '../../models/entities/person';
import { ContentBlock } from '../../models/entities/content-block';
import { EntityType } from '../../models/entities/enums/entity-type';
import { TypeChecker } from '../utils/type-checker';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements ILocalStorage {

  private _isValid: boolean;

  constructor() {
    this._isValid = this.isValid();
  }

  public isValid() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('feature_test', 'yes');
        if (localStorage.getItem('feature_test') === 'yes') {
          localStorage.removeItem('feature_test');
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }

  private _persons: CachedEntity<Person>[] = [];
  public getPersons(): Person[] {
    if (!this._isValid) {
      this.throwStorageError();
    }
    if (isNullOrUndefined(this._persons) || this._persons.length === 0) {
      this._persons = this.getEntity(EntityType.Person);
      this._persons.forEach(p => {
        p.entity.bioBlock.contentBlocks = this.getContentBlocks(p.entity.bioBlock.id);
      });
    }
    return this._persons.map(p => p.entity);
  }

  public getPerson(id: number): Person {
    if (!this._isValid) {
      this.throwStorageError();
    }
    if (isNullOrUndefined(this._persons) || this._persons.length === 0) {
      this._persons = this.getEntity(EntityType.Person);
    }
    const person = this._persons.find(p => p.id === id);
    person.entity.bioBlock.contentBlocks = this.getContentBlocks(person.entity.bioBlock.id);
    return person.entity;
  }

  private _contentBlocks: CachedEntity<ContentBlock[]>[] = [];
  public getContentBlocks(bioBlockId: number): ContentBlock[] {
    if (!this._isValid) {
      this.throwStorageError();
    }
    if (isNullOrUndefined(this._contentBlocks) || this._contentBlocks.length === 0) {
      this._contentBlocks = this.getEntity(EntityType.ContentBlock);
    }
    return this._contentBlocks.find(c => c.id === bioBlockId).entity;
  }

  public addPersons(persons: Person[]) {
    if (!this.isValid()) {
      this.throwStorageError();
    }
    persons.forEach(p => {
      this.addContentBlocks(p.bioBlock.id, p.bioBlock.contentBlocks);
      p.bioBlock.contentBlocks = [];
    });
    const newPersons: Person[] = this.newEntity(persons);
    const newCachedPersons = newPersons.map(p => new CachedEntity(p, p.id, new Date()));
    this._persons = !isNullOrUndefined(newPersons) ?
      this._persons.concat(this.setEntity(EntityType.Person, newCachedPersons))
      : [].concat(this.setEntity(EntityType.Person, newCachedPersons));
  }

  public addContentBlocks(bioBlockId: number, blocks: ContentBlock[]) {
    if (!this.isValid()) {
      this.throwStorageError();
    }
    const newBlocks: ContentBlock[] = this.newEntity(blocks);
    const newCachedBlocks = [new CachedEntity(newBlocks, bioBlockId, new Date())];
    this._contentBlocks = !isNullOrUndefined(newBlocks) ?
      this._contentBlocks.concat(this.setEntity(EntityType.ContentBlock, newCachedBlocks))
      : [].concat(this.setEntity(EntityType.Person, newCachedBlocks));
  }

  getAveragePersonsCacheTime(): number | null {
    if (isNullOrUndefined(this._persons) || this._persons.length === 0) {
      return null;
    }
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    const result = this._persons.map(p => Math.round((p.setTime.getTime() / 1000))).reduce(reducer);
    return result / this._persons.length;
  }

  getPersonCacheTime(id: number): number | null {
    if (isNullOrUndefined(this._persons) || this._persons.length === 0) {
      return null;
    }
    const person = this._persons.find(p => p.id === id);
    if (isNullOrUndefined(person)) {
      return null;
    }
    return Math.round((person.setTime.getTime() / 1000));
  }

  getContentBlocksCacheTime(bioBlockId: number): number {
    if (isNullOrUndefined(this._contentBlocks) || this._contentBlocks.length === 0) {
      return null;
    }
    const blocks = this._contentBlocks.find(c => c.id === bioBlockId);
    if (isNullOrUndefined(blocks)) {
      return null;
    }
    return Math.round((blocks.setTime.getTime() / 1000));
  }

  public clearStorage() {
    if (!this._isValid) {
      this.throwStorageError();
    }
    this.clearPersons();
    this.clearContentBlocks();
  }

  public clearPersons() {
    if (!this._isValid) {
      this.throwStorageError();
    }
    localStorage[EntityType.Person] = JSON.stringify([]);
    this._persons = [];
  }

  public clearContentBlocks() {
    if (!this._isValid) {
      this.throwStorageError();
    }
    localStorage[EntityType.ContentBlock] = JSON.stringify([]);
    this._contentBlocks = [];
  }

  public saveAll() {
    if (!this.isValid()) {
      this.throwStorageError();
    }
    this.savePersons();
    this.saveContentBlocks();
  }

  public savePersons() {
    if (!this.isValid()) {
      this.throwStorageError();
    }
    const persons = this.getPersons();
    this.clearPersons();
    this.addPersons(persons);
  }

  public saveContentBlocks() {
    if (!this.isValid()) {
      this.throwStorageError();
    }
    const blocks = this._contentBlocks;
    this.clearContentBlocks();
    this._contentBlocks = !isNullOrUndefined(blocks) ?
      this._contentBlocks.concat(this.setEntity(EntityType.ContentBlock, blocks))
      : [].concat(this.setEntity(EntityType.Person, blocks));
  }

  public deletePersons(ids: Person[] | number[]) {
    if (!this._isValid) {
      this.throwStorageError();
    }
    if (isNullOrUndefined(ids) || ids.length === 0) {
      return false;
    }
    let result: boolean;
    let idsToDelete: number[];
    let bioIdsToDelete: BaseBioBlock[];
    if (TypeChecker.isNumberArray(ids)) {
      bioIdsToDelete = this.getPersons().filter(p => ids.includes(p.id)).map(p => p.bioBlock);
      idsToDelete = ids;
    } else {
      bioIdsToDelete = ids.map(p => p.bioBlock);
      idsToDelete = ids.map(p => p.id);
    }
    result = this.deleteEntity(EntityType.Person, idsToDelete);
    if (result) {
      bioIdsToDelete.forEach(b => {
        this.deleteContentBlocks(b.id, b.contentBlocks);
      });
      this.updateCache(EntityType.Person, idsToDelete);
    }
    return result;
  }

  public deleteContentBlocks(bioBlockId: number, ids: ContentBlock[] | number[] = null) {
    if (!this._isValid) {
      this.throwStorageError();
    }
    if (isNullOrUndefined(ids) || ids.length === 0) {
      if (this.deleteEntity(EntityType.ContentBlock, [bioBlockId])) {
        const toDelete = this._contentBlocks.find(b => b.id === bioBlockId).entity.map(b => b.id);
        this.updateCache(EntityType.ContentBlock, toDelete, bioBlockId);
        return true;
      }
      return false;
    }
    let idsToDelete;
    if (TypeChecker.isNumberArray(ids)) {
      idsToDelete = ids;
    } else {
      idsToDelete = ids.map(p => p.id);
    }
    const block = this._contentBlocks.find(b => b.id === bioBlockId);
    if (isNullOrUndefined(block)) {
      return false;
    }
    block.entity = block.entity.filter(b => !idsToDelete.includes(b.id));
    this.saveContentBlocks();
    this.updateCache(EntityType.ContentBlock, idsToDelete, bioBlockId);
  }


  private deleteEntity(type: EntityType, ids: number[]): boolean {
    if (!this._isValid) {
      this.throwStorageError();
    }
    const content = localStorage[type];
    let result = true;
    if (isNullOrUndefined(ids) || ids.length === 0) {
      result = false;
    }
    if (result && (isNullOrUndefined(content) || content === '')) {
      result = false;
    } else {
      const parsedContent = JSON.parse(content);
      if (result && (isNullOrUndefined(parsedContent) || parsedContent.length === 0)) {
        result = false;
      }
      if (result) {
        const contentWODeleteItems = parsedContent.filter((e: any) => !ids.includes(e.id));
        localStorage[type] = JSON.stringify(contentWODeleteItems);
      }
    }
    return result;
  }

  private getEntity(type: EntityType): any[] {
    if (!this._isValid) {
      this.throwStorageError();
    }
    const content = localStorage[type];
    if (isNullOrUndefined(content) || content === '') {
      return [];
    } else {
      return JSON.parse(content);
    }
  }

  private setEntity(type: EntityType, entity: any[]) {
    let result;
    if (this._isValid) {
      if (isNullOrUndefined(entity) || entity.length === 0) {
        this.throwStorageError();
      }
      const savedAsString = localStorage[type];
      const isSaved = isNullOrUndefined(savedAsString) || savedAsString === '' ? false : true;
      if (!isSaved) {
        result = entity;
        localStorage[type] = JSON.stringify(entity);
      } else {
        const savedEntities: any = JSON.parse(savedAsString);
        const itemsToSave = entity.filter(e => !savedEntities.map(s => s.id).includes(e.id));
        result = itemsToSave;
        localStorage[type] = JSON.stringify(savedEntities.concat(itemsToSave));
      }
    } else {
      this.throwStorageError();
    }
    return result;
  }

  private updateCache(type: EntityType, ids: number[], parentId = -1) {
    switch (type) {
      case EntityType.Person:
        this._persons = this._persons.filter(p => !ids.includes(p.id));
        break;
      case EntityType.ContentBlock:
          const blocks = this._contentBlocks.find(c => c.id === parentId);
          blocks.entity = blocks.entity.filter(b => !ids.includes(b.id));
        break;
    }
  }

  private newEntity(entity: any) {
    if (!isNullOrUndefined(entity)) {
      return JSON.parse(JSON.stringify(entity));
    } else {
      return null;
    }
  }

  private throwStorageError() {
    throw new Error('LocalStorage error');
  }

}
