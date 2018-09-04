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
    const localPersons = this._localStorage.getPersons();
    if (isNullOrUndefined(localPersons) || localPersons.length === 0) {
      const serverPersons = await this._serverStorage.getPersons();
      this._localStorage.addPersons(serverPersons);
      this._persons = this._localStorage.getPersons();
      this._persons.forEach(p => {
        this._localStorage.addContentBlocks(p.bioBlock.id, p.bioBlock.contentBlocks);
      })
    } else {
      this._persons = localPersons;
    }
    return this._persons;
  }

  private _contentBlocks: ContentBlock[];
  public async getContentBlock(bioBlockId: number) {
    if (!isNullOrUndefined(this._contentBlocks)) {
      return this._contentBlocks;
    }
    const localBlocks = this._localStorage.getContentBlocks(bioBlockId);
    if (isNullOrUndefined(localBlocks) || localBlocks.length === 0) {
      const serverBlocks = await this._serverStorage.getContentBlocks(bioBlockId);
      this._localStorage.addContentBlocks(bioBlockId, serverBlocks);
      this._contentBlocks = this._localStorage.getContentBlocks(bioBlockId);
    } else {
      this._contentBlocks = localBlocks;
    }
    return this._contentBlocks;
  }
}
