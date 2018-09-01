import { PkddHttpService } from './pkdd-http.service';
import { Injectable } from '@angular/core';
import { ApiUrlConstructorService } from './api-url-constructor.service';

@Injectable({
  providedIn: 'root'
})
export class ServerDataStorageService {

  // public get getPersons() {

  // }

  // public get getContentBlocks() {

  // }

  // public get getBaseBlocks() {

  // }

  constructor(
    private readonly _httpClient: PkddHttpService,
    private readonly _apiConstructor: ApiUrlConstructorService
  ) {
  }
}
