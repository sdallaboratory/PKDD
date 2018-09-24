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
  public async getPersons(flagToUpdate = false): Promise<ServerStorageResponse<Person[]>> {
    let fromServer = false;
    if (!this._isLoaded.persons || flagToUpdate) {
      try {
        this._persons = this._factory.createPersons(await this.makeAction(ActionType.Get, EntityType.Person));
        this._isLoaded.persons = true;
      } catch {
        this._persons = [];
      } finally {
        fromServer = true;
      }
    }
    return new ServerStorageResponse(this._persons, fromServer);
  }

  public async getPerson(id: number, flagToUpdate = false) {
    let result = new ServerStorageResponse(this._persons.find(p => p.id === id), false);
    if (isNullOrUndefined(result.entity) || flagToUpdate) {
      const person = this._factory.createPerson(await this.makeAction(ActionType.Get, EntityType.Person, id));
      this._persons.push(person);
      result = new ServerStorageResponse(person, true);
    }
    return result;
  }

  private _contentBlocks: CachedEntity<ContentBlock[]>[] = [];
  public async getContentBlocks(baseBioBlockId: number, flagToUpdate = false) {
    let result = new ServerStorageResponse(this._contentBlocks.find(b => b.id === baseBioBlockId), false);
    if (isNullOrUndefined(result.entity) || flagToUpdate) {
      try {
        const blocks = this._factory.createContentBlocks(baseBioBlockId,
          await this.makeAction(ActionType.Get, EntityType.ContentBlock, null, baseBioBlockId));
        const cachedBlock = new CachedEntity(blocks, baseBioBlockId, new Date());
        this._contentBlocks.push(cachedBlock);
      } catch {

      } finally {
        result = new ServerStorageResponse(this._contentBlocks.find(b => b.id === baseBioBlockId), true);
      }
    }
    return !isNullOrUndefined(result.entity) ? result : null;
  }

  public async addPerson(person: Person): Promise<Person> {
    let result = null;
    try {
      const body = this._factory.createPersonBackend(person);
      result = this._factory.createPerson(await this.makeAction(ActionType.Post, EntityType.Person, null, null, body));
      this._persons.push(result);
    } catch {

    }
    return result;
  }

  public async deletePerson(personId: number) {
    try {
      await this.makeAction(ActionType.Delete, EntityType.Person, personId);
      this._persons.splice(this._persons.findIndex(p => p.id === personId), 1);
    } catch {

    }
  }

  public async updatePerson(person: Person) {
    let result = null;
    try {
      const body = this._factory.createPersonBackend(person);
      result = this.makeAction(ActionType.Put, EntityType.Person, person.id, null, body);
      this._persons.splice(this._persons.findIndex(p => p.id === result.id), 1);
      this._persons.push(person);
    } catch {

    }
  }

  public async updateContentBlock(baseBioBlockId: number, block: ContentBlock) {
    let result = null;
    try {
      const body = this._factory.createContentBlockBackend(block);
      const responseResult = await this.makeAction(ActionType.Put, EntityType.ContentBlock, block.id, baseBioBlockId, body);
      result = this._factory.createContentBlock(baseBioBlockId, responseResult);
      this._persons.push(result);
    } catch {

    }
  }

  public async addContentBlock(baseBioBlockId: number, block: ContentBlock) {
    let result = null;
    try {
      const body = this._factory.createContentBlockBackend(block);
      result = this._factory.createContentBlock(baseBioBlockId, (await this.makeAction(
        ActionType.Post,
        EntityType.ContentBlock,
        null,
        baseBioBlockId,
        body)));
      const baseBlock = this.findBlock(baseBioBlockId, result.id);
      if (isNullOrUndefined(baseBioBlockId)) {
        this._contentBlocks.push(new CachedEntity([result], baseBioBlockId, new Date()));
      } else {
        baseBlock.subBlocks.push(result);
      }
    } catch {

    }
  }

  public async deleteContentBlock(baseBioBlockId: number, id: number) {
    try {
      await this.makeAction(ActionType.Delete, EntityType.ContentBlock, id, baseBioBlockId);
      const baseBlock = this.findBlock(baseBioBlockId, id);
      if (isNullOrUndefined(baseBioBlockId)) {
        const mainBlock = this._contentBlocks.find(b => b.id === baseBioBlockId);
        mainBlock.entity.splice(mainBlock.entity.findIndex(b => b.id === id), 1);
      } else {
        baseBlock.subBlocks.splice(baseBlock.subBlocks.findIndex(b => b.id === id), 1);
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
    entityId: null | number = null,
    parentEntityId: null | number = null,
    body: any = null
  ): Promise<any> {
    const url = this.makeUrl(entityType, entityId, parentEntityId);
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

  private makeUrl(type: EntityType, entityId: number | null, parentEntityId: number) {
    let url = '';
    switch (type) {
      case EntityType.Person:
        url = this._apiConstructor.getPersonUrl(entityId);
        break;
      case EntityType.BioBlock:
        url = this._apiConstructor.getBioUrl(entityId);
        break;
      case EntityType.ContentBlock:
        url = this._apiConstructor.getContentsUrl(parentEntityId, entityId);
        break;
    }
    return url;
  }

  private findBlock(baseBlockId: number, id: number) {
    const block = this._contentBlocks.find(b => b.id === baseBlockId);
    if (isNullOrUndefined(block)) {
      return null;
    }
    let resultArray: ContentBlock[] = [];
    block.entity.forEach(b => {
      resultArray = resultArray.concat(ContentBlock.inRow(b));
    });
    return resultArray.find(b => b.id === id);
  }

}

class ServerStorageResponse<T> {
  entity: T;
  fromServer: boolean;

  constructor(entity: T, fromServer: boolean) {
    this.entity = entity,
      this.fromServer = fromServer;
  }
}

enum ActionType {
  Get,
  Post,
  Put,
  Delete
}
