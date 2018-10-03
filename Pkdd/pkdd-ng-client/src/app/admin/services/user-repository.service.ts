import { PkddUser } from './../../models/auth/pkdd-user';
import { ApiUrlConstructorService } from './../../core/services/api-url-constructor.service';
import { Injectable } from '@angular/core';
import { PkddHttpService } from '../../core/services/pkdd-http.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  private users: PkddUser[] = [];

  constructor(
    private readonly url: ApiUrlConstructorService,
    private readonly http: PkddHttpService
  ) { }


  public async getUsers() {
    if (!isNullOrUndefined(this.users) && this.users.length > 0) {
      return this.users;
    }
    try {
      this.users = await this.http.get<PkddUser[]>(this.url.getUsersUrl());
    } catch (error) {
    }
    return this.users;
  }
}
