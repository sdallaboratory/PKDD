import { Injectable } from '@angular/core';
import { PkddUser } from '../../models/auth/pkdd-user';
import { PkddHttpService } from '../../core/services/pkdd-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthorized = false;

  public get isAuthorized() {
    return this._isAuthorized;
  }

  private _user: PkddUser = null;

  public get user() {
    return this._user;
  }

  constructor(
    private readonly http: PkddHttpService
  ) { }

  public signIn() {

  }

  public signUp() {

  }

  public signOut() {

  }

  public restorePassword() {

  }

}
