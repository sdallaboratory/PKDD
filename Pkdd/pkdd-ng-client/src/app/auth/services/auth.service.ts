import { Injectable, EventEmitter } from '@angular/core';
import { PkddUser } from '../../models/auth/pkdd-user';
import { PkddHttpService } from '../../core/services/pkdd-http.service';
import { SignUpModel } from '../../models/auth/sign-up-model';
import { SignInModel } from '../../models/auth/sign-in-model';
import { SignOutModel } from '../../models/auth/sign-out-model';
import { RestorePasswordModel } from '../../models/auth/restore-password-model';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../core/services/environment.service';
import { PkddRoles } from '../../models/auth/pkdd-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: PkddUser = undefined;

  private gettingUser: Promise<void>;

  public readonly userChanged = new EventEmitter<PkddUser>();

  private setUser(user: PkddUser) {
    this.user = user;
    this.userChanged.emit(user);
  }

  public async getUserAsync(): Promise<PkddUser> {
    if (this.user === undefined) {
      await this.gettingUser;
    }
    return this.user;
  }

  public async isAuthedAsync() {
    return await this.getUserAsync() !== null;
  }

  constructor(
    private readonly http: PkddHttpService,
    private readonly router: Router,
  ) {
    this.gettingUser = this.getUserFromServerAsync();
  }

  public async signInAsync(email: string, password: string, remeber = false): Promise<PkddUser> {
    const model = new SignInModel(email, password, remeber);
    this.user = await this.http.post<PkddUser>('/api/auth/sign-in', model);
    return this.user;
  }

  public async signUpAsync(name: string, email: string, password: string): Promise<void> {
    const model = new SignUpModel(name, email, password);
    await this.http.post('/api/auth/sign-up', model);
  }

  public async signOutAsync(fromEverywhere = false) {
    this.user = null;
    const model = new SignOutModel(fromEverywhere);
    await this.http.post('/api/auth/sign-out', model);
    this.router.navigate(['/auth']);
  }

  public async restorePasswordAsync(email: string, surname: string) {
    const model = new RestorePasswordModel(email, surname);
    await this.http.post('/api/auth/restore-password', model);
  }

  private async getUserFromServerAsync() {
    try {
      this.user = await this.http.get<PkddUser>('/api/auth/get-user');
    } catch {
      this.user = null;
    }
  }
}
