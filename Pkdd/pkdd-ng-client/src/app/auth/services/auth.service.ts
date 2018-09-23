import { Injectable } from '@angular/core';
import { PkddUser } from '../../models/auth/pkdd-user';
import { PkddHttpService } from '../../core/services/pkdd-http.service';
import { SignUpModel } from '../../models/auth/sign-up-model';
import { SignInModel } from '../../models/auth/sign-in-model';
import { SignOutModel } from '../../models/auth/sign-out-model';
import { RestorePasswordModel } from '../../models/auth/restore-password-model';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../core/services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: PkddUser = undefined;

  private gettingUser: Promise<void>;

  public async getUserAsync(): Promise<PkddUser> {
    if (this._user === undefined) {
      await this.gettingUser;
    }
    return this._user;
  }

  public async isAuthedAsync() {
    return await this.getUserAsync() !== null;
  }

  constructor(
    private readonly http: PkddHttpService,
    private readonly router: Router,
    private readonly env: EnvironmentService
  ) {
    this.gettingUser = this.getUserFromServerAsync();
  }

  public async signInAsync(email: string, password: string, remeber = false): Promise<PkddUser> {
    const model = new SignInModel(email, password, remeber);
    this._user = await this.http.post<PkddUser>('/api/auth/sign-in', model);
    return this._user;
  }

  public async signUpAsync(name: string, email: string, password: string): Promise<void> {
    const model = new SignUpModel(name, email, password);
    await this.http.post('/api/auth/sign-up', model);
  }

  public async signOutAsync(fromEverywhere = false) {
    this._user = null;
    const model = new SignOutModel(fromEverywhere);
    await this.http.post('/api/auth/sign-out', model);
    this.router.navigate(['/auth']);
  }

  public async restorePasswordAsync(email: string, surname: string) {
    const model = new RestorePasswordModel(email, surname);
    await this.http.post('/api/auth/restore-password', model);
  }

  private async getUserFromServerAsync() {
    this._user = await this.http.get<PkddUser>('/api/auth/get-user');
  }
}
