import { LocalStorageService } from './local-storage.service';
import { ServerDataStorageService } from './server-data-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private readonly _serverStorage: ServerDataStorageService,
    private readonly _localStorage: LocalStorageService
  ) { }
}
