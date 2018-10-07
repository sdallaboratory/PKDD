import { PkddRoles } from './../../models/auth/pkdd-roles.enum';
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
      const user = this.users[0];
      for (let i = 0; i < 60; i++) {
        this.users.push(user);
      }
    } catch (error) {
    }
    return this.users;
  }

  public async banUser(id: number, flag: boolean) {
    if (isNullOrUndefined(this.users) || this.users.length === 0) {
     return false;
    }
    try {
      await this.http.post(`${this.url.getUsersUrl(id)}/ban/${flag}`, {});
      return true;
    } catch (error) {
      return false;
    }
  }

  public async roleActions(id: number, flag: boolean, role: string) {
    if (isNullOrUndefined(this.users) || this.users.length === 0) {
      return false;
     }
     try {
       await this.http.post(`${this.url.getUsersUrl(id)}/role-actions/${role}/${flag}`, {});
       return true;
     } catch (error) {
       return false;
     }
  }
}
