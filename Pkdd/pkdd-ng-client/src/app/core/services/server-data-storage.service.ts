import { PkddHttpService } from './pkdd-http.service';
import { Injectable } from '@angular/core';
import { ApiUrlConstructorService } from './api-url-constructor.service';
import { EntitiesFactoryService } from './entities-factory.service';
import { EntityType } from '../../models/entities/enums/entity-type';
import { Person } from '../../models/entities/person';
import { IIsEntityLoaded } from '../../models/entities/interfaces/is-entity-loaded';
import { ContentBlock } from '../../models/entities/content-block';
import { CachedEntity } from '../../models/core/cached-entity';
import { isNullOrUndefined } from 'util';

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
  public async getPersons(flagToUpdate = false) {
    if (!this._isLoaded.persons || flagToUpdate) {
      this._persons = this._factory.createPersons(await this.loadEntity(EntityType.Person));
      this._isLoaded.persons = true;
    }
    return this._persons;
  }

  public async getPerson(id: number, flagToUpdate = false) {
    if (isNullOrUndefined(this._persons.find(p => p.id === id)) || flagToUpdate) {
      const person = this._factory.createPerson(await this.loadEntity(EntityType.Person, id));
      this._persons.push(person);
    }
    return this._persons.find(p => p.id === id);
  }

  private _contentBlocks: CachedEntity<ContentBlock[]>[] = [];
  public async getContentBlocks(baseBioBlockId: number, flagToUpdate = false) {
    if (isNullOrUndefined(this._contentBlocks.find(b => b.id === baseBioBlockId)) || flagToUpdate) {
      const blocks = this._factory.createContentBlocks(baseBioBlockId,
        await this.loadEntity(EntityType.ContentBlock, null, baseBioBlockId));
      this._contentBlocks.push(new CachedEntity(blocks, baseBioBlockId, new Date()));
    }
    return this._contentBlocks.find(b => b.id === baseBioBlockId).entity;
  }

  constructor(
    private readonly _httpClient: PkddHttpService,
    private readonly _apiConstructor: ApiUrlConstructorService,
    private readonly _factory: EntitiesFactoryService
  ) {
  }

  /**
   * Loads entity from server with type from enum "EntityType"
   */
  private async loadEntity(type: EntityType, entityId: null | number = null, parentEntityId: null | number = null): Promise<any> {
    let url = '';
    try {
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
    } catch (err) {
      console.log(err);
    }
    return await this._httpClient.get(url);
  }

}

