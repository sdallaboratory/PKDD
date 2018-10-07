import { UserCreateModel } from './../models/user-create-model';
import { PkddRoles } from './../../models/auth/pkdd-roles.enum';
import { PkddUser } from './../../models/auth/pkdd-user';
import { ApiUrlConstructorService } from './../../core/services/api-url-constructor.service';
import { Injectable } from '@angular/core';
import { PkddHttpService } from '../../core/services/pkdd-http.service';
import { isNullOrUndefined } from 'util';
import { RoleRequest, RoleActions } from '../models/role-request';
import { BanRequest, BanActions } from '../models/ban-request';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  private users: PkddUser[] = [];

  constructor(
    private readonly url: ApiUrlConstructorService,
    private readonly http: PkddHttpService,
    private readonly auth: AuthService
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

  public async banOrUnbanUser(id: number, isBanned: boolean) {
    if (isNullOrUndefined(this.users) || this.users.length === 0) {
      return false;
    }
    try {
      await this.http.post(`${this.url.getUsersUrl(id)}/ban`,
        new BanRequest(isBanned ? BanActions.Unban : BanActions.Ban));
      return true;
    } catch (error) {
      return false;
    }
  }

  public async addOrRemoveRole(id: number, isInRole: boolean, role: PkddRoles) {
    if (isNullOrUndefined(this.users) || this.users.length === 0) {
      return false;
    }
    try {
      await this.http.post(`${this.url.getUsersUrl(id)}/role-actions/`,
        new RoleRequest(role, isInRole ? RoleActions.Remove : RoleActions.Add));
      return true;
    } catch (error) {
      return false;
    }
  }

  public async confirm(id: number) {
    if (isNullOrUndefined(this.users) || this.users.length === 0) {
      return false;
    }
    try {
      await this.http.post(`${this.url.getUsersUrl(id)}/confirm/`, {});
      return true;
    } catch (error) {
      return false;
    }
  }

  public async addUser(user: UserCreateModel) {
    try {
      const newUser = await this.http.post<PkddUser>(`${this.url.getUsersUrl()}/`, user);
      this.users.unshift(newUser);
      return newUser;
    } catch (error) {
      return null;
    }
  }

  public async deleteUser(id: number) {
    if (isNullOrUndefined(this.users) || this.users.length === 0) {
      return false;
    }
    if (!this.users.find(u => u.id === id)) {
      return false;
    }
    if (this.users.find(u => u.id === id) && (await this.auth.getUserAsync()).id === id) {
      alert('Самурай недостоин такой простой участи!');
      return false;
    }
    try {
      await this.http.delete(`${this.url.getUsersUrl(id)}`);
      this.users.splice(this.users.findIndex(u => u.id === id), 1);
      return true;
    } catch (error) {
      return false;
    }
  }
}
