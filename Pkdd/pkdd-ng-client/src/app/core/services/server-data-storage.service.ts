import { PkddUser } from './../../models/auth/pkdd-user';
import { PkddHttpService } from './pkdd-http.service';
import { Injectable } from '@angular/core';
import { ApiUrlConstructorService } from './api-url-constructor.service';
import { EntitiesFactoryService } from './entities-factory.service';
import { EntityType } from '../../models/entities/enums/entity-type';
import { Person } from '../../models/entities/person';
import { IIsEntityLoaded } from '../../models/entities/interfaces/is-entity-loaded';
import { ContentBlock } from '../../models/entities/content-block';
import { CachedEntity } from '../../models/core/cached-entity';
import { isNullOrUndefined, isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ServerDataStorageService {

  private _isLoaded: IIsEntityLoaded = {
    persons: false,
    contentBlocks: false,
    bioBlocks: false,
  };

  private _persons: Person[] = [];
  public async getPersons(flagToUpdate = false): Promise<Person[]> {
    if (!this._isLoaded.persons || flagToUpdate) {
      try {
        this._persons = this._factory.createPersons(await this.makeAction(ActionType.Get, EntityType.Person));
        this._isLoaded.persons = true;
      } catch {
        this._persons = [];
      }
    }
    return this._persons;
  }

  public async getPerson(id: number, flagToUpdate = false) {
    let result = this._persons.find(p => p.id === id);
    if (isNullOrUndefined(result) || flagToUpdate) {
      const person = this._factory.createPerson(await this.makeAction(ActionType.Get, EntityType.Person, null, id));
      this._persons.push(person);
      result = person;
    }
    return result;
  }

  private _contentBlocks: CachedEntity<ContentBlock[]>[] = [];
  public async getContentBlocks(baseBioBlockId: number, flagToUpdate = false) {
    let result = this._contentBlocks.find(b => b.id === baseBioBlockId);
    if (isNullOrUndefined(result) || flagToUpdate) {
      try {
        const blocks = this._factory.createContentBlocks(baseBioBlockId,
          await this.makeAction(ActionType.Get, EntityType.ContentBlock, null, null, baseBioBlockId));
        const cachedBlock = new CachedEntity(blocks, baseBioBlockId, new Date());
        this._contentBlocks.push(cachedBlock);
        result = cachedBlock;
      } catch {
      }
    }
    return !isNullOrUndefined(result) ? result : null;
  }

  public async addPerson(person?: Person): Promise<Person> {
    let result = null;
    const newPerson = !isNullOrUndefined(person) ? person : this._factory.createNewPerson();
    try {
      const body = this._factory.createPersonBackend(newPerson);
      result = this._factory.createPerson(await this.makeAction(ActionType.Post, EntityType.Person, body));
      result.name = `Новая персона ${result.id}`;
      this._persons.push(result);
    } catch {

    }
    return result;
  }

  public async deletePerson(personId: number) {
    try {
      await this.makeAction(ActionType.Delete, EntityType.Person, null, personId);
      this._persons.splice(this._persons.findIndex(p => p.id === personId), 1);
    } catch {

    }
  }

  public async updatePerson(person: Person) {
    let result = null;
    try {
      const body = this._factory.createPersonBackend(person);
      result = this.makeAction(ActionType.Put, EntityType.Person, body, person.id);
      this._persons.splice(this._persons.findIndex(p => p.id === result.id), 1);
      this._persons.push(person);
    } catch {

    }
  }

  public async updateContentBlock(baseBioBlockId: number, block: ContentBlock) {
    let result = null;
    try {
      const body = this._factory.createContentBlockBackend(block);
      const responseResult = await this.makeAction(ActionType.Put, EntityType.ContentBlock, body, null, baseBioBlockId);
      result = this._factory.createContentBlock(baseBioBlockId, responseResult);
      this._persons.push(result);
    } catch {

    }
  }

  public async addContentBlock(baseBioBlockId: number, block: ContentBlock, parentId: number | null = null) {
    let result = null;
    try {
      const body = this._factory.createContentBlockBackend(block);
      console.log(body, JSON.stringify(body));

      result = this._factory.createContentBlock(baseBioBlockId, (await this.makeAction(
        ActionType.Post,
        EntityType.ContentBlock,
        body,
        null,
        baseBioBlockId,
        parentId
      )), parentId);
      const baseBlock = this.findBlock(baseBioBlockId, block.parentId);
      if (isNullOrUndefined(baseBlock)) {
        this._contentBlocks.find(b => b.id === baseBioBlockId).entity.push(result);
      } else {
        baseBlock.subBlocks.push(result);
      }
    } catch (ex) {
      console.log(ex);

    }
  }

  public async deleteContentBlock(baseBioBlockId: number, block: ContentBlock) {
    try {
      await this.makeAction(ActionType.Delete, EntityType.ContentBlock, null, block.id, baseBioBlockId);
      const baseBlock = this.findBlock(baseBioBlockId, block.parentId);
      console.log(block, baseBlock);

      if (isNullOrUndefined(baseBlock)) {
        const mainBlock = this._contentBlocks.find(b => b.id === baseBioBlockId);
        mainBlock.entity.splice(mainBlock.entity.findIndex(b => b.id === block.id), 1);
      } else {
        baseBlock.subBlocks.splice(baseBlock.subBlocks.findIndex(b => b.id === block.id), 1);
      }
    } catch {
    }
  }

  constructor(
    private readonly _httpClient: PkddHttpService,
    private readonly _apiConstructor: ApiUrlConstructorService,
    private readonly _factory: EntitiesFactoryService
  ) {
  }

  /**
   * makes action "ActionType" with server with type from enum "EntityType"
   */
  private async makeAction(
    actionType: ActionType,
    entityType: EntityType,
    body: any = null,
    entityId: null | number = null,
    parentEntityId: null | number = null,
    contentParent: null | number = null,
  ): Promise<any> {
    const url = this.makeUrl(entityType, entityId, parentEntityId, contentParent);
    switch (actionType) {
      case ActionType.Get:
        return await this._httpClient.get(url);
      case ActionType.Post:
        return await this._httpClient.post(url, body);
      case ActionType.Put:
        return await this._httpClient.put(url, body);
      case ActionType.Delete:
        return await this._httpClient.delete(url);
    }
  }

  private makeUrl(type: EntityType, entityId: number | null, parentEntityId: number, contentParent: null | number = null) {
    let url = '';
    switch (type) {
      case EntityType.Person:
        url = this._apiConstructor.getPersonUrl(entityId);
        break;
      case EntityType.BioBlock:
        url = this._apiConstructor.getBioUrl(entityId);
        break;
      case EntityType.ContentBlock:
        url = this._apiConstructor.getContentsUrl(parentEntityId, entityId, contentParent);
        break;
    }
    return url;
  }

  private findBlock(baseBlockId: number, id: number) {
    const block = this._contentBlocks.find(b => b.id === baseBlockId);
    if (isNullOrUndefined(block)) {
      return null;
    }
    if (id === -1) {
      return null;
    }
    let resultArray: ContentBlock[] = [].concat(block.entity);
    block.entity.forEach(b => {
      resultArray = resultArray.concat(ContentBlock.inRow(b));
    });
    resultArray = resultArray.filter(b => !isNullOrUndefined(b));
    console.log(resultArray, id);

    return resultArray.find(b => b.id === id);
  }

}
enum ActionType {
  Get,
  Post,
  Put,
  Delete
}
