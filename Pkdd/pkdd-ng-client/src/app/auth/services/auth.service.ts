import { Injectable } from '@angular/core';
import { PkddUser } from '../../models/auth/pkdd-user';
import { PkddHttpService } from '../../core/services/pkdd-http.service';
import { SignUpModel } from '../../models/auth/sign-up-model';
import { SignInModel } from '../../models/auth/sign-in-model';

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

  public async signIn(email: string, password: string, remeber = false): Promise<PkddUser> {
    const model = new SignInModel(email, password, remeber);
    this._user = await this.http.post<PkddUser>('/api/auth/sign-in', model);
    return this._user;
  }

  public async signUp(name: string, email: string, password: string): Promise<void> {
    const model = new SignUpModel(name, email, password);
    await this.http.post('/api/auth/sign-up', model);
  }

  public signOut() {

  }

  public restorePassword() {

  }

}
