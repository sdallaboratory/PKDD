import { Injectable } from '@angular/core';
import { PkddUser } from '../../models/auth/pkdd-user';
import { PkddHttpService } from '../../core/services/pkdd-http.service';
import { SignUpModel } from '../../models/auth/sign-up-model';
import { SignInModel } from '../../models/auth/sign-in-model';
import { SignOutModel } from '../../models/auth/sign-out-model';
import { RestorePasswordModel } from '../../models/auth/restore-password-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthorized: Promise<boolean> = null;

  private _user: PkddUser = null;

  public get user() {
    return this._user;
  }

  public isAuthorizedAsync() {
    if (this._isAuthorized === null) {
      this._isAuthorized = this.getUserAsync();
    }
    return this._isAuthorized;
  }

  constructor(
    private readonly http: PkddHttpService
  ) { }

  public async signInAsync(email: string, password: string, remeber = false): Promise<PkddUser> {
    const model = new SignInModel(email, password, remeber);
    this._user = await this.http.post<PkddUser>('/api/auth/sign-in', model);
    this._isAuthorized = this.getUserAsync();
    console.log(this._user);
    return this._user;
  }

  public async signUpAsync(name: string, email: string, password: string): Promise<void> {
    const model = new SignUpModel(name, email, password);
    await this.http.post('/api/auth/sign-up', model);
  }

  public async signOutAsync(fromEverywhere = false) {
    const model = new SignOutModel(fromEverywhere);
    await this.http.post('/api/auth/sign-out', model);
    this._isAuthorized = this.getUserAsync();
  }

  public async restorePasswordAsync(email: string, surname: string) {
    const model = new RestorePasswordModel(email, surname);
    await this.http.post('/api/auth/restore-password', model);
  }

  private async getUserAsync() {
    try {
      const result = await this.http.get<PkddUser>('/api/auth/get-user');
      if (!result) {
        this._user = null;
      }
      console.log(result, this.user);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}
