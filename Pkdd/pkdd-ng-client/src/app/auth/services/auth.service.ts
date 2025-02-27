import { Injectable, EventEmitter } from '@angular/core';
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

  private user: PkddUser = undefined;

  private gettingUser: Promise<void>;

  public readonly userChanged = new EventEmitter<PkddUser>();

  private setUser(user: PkddUser) {
    this.user = user;
    this.userChanged.emit(user);
  }

  public async getUserAsync(): Promise<PkddUser> {
    if (this.user) {
      return this.user;
    }
    if (this.gettingUser) {
      await this.gettingUser;
      return this.user;
    }
    this.gettingUser = this.loadUserFromServerAsync();
    return await this.getUserAsync();
  }

  public async isAuthedAsync(): Promise<boolean> {
    return await this.getUserAsync() !== null;
  }

  constructor(
    private readonly http: PkddHttpService,
    private readonly router: Router,
    private readonly env: EnvironmentService
  ) {
    this.getUserAsync();
  }

  public async signInAsync(email: string, password: string, remeber = false): Promise<PkddUser> {
    if (this.user) {
      return this.user;
    }
    const model = new SignInModel(email, password, remeber);
    const signedInUser = await this.http.post<PkddUser>('/api/auth/sign-in', model);
    this.setUser(signedInUser);
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

  private async loadUserFromServerAsync() {
    try {
      this.setUser(await this.http.get<PkddUser>('/api/auth/get-user'));
    } catch {
      this.user = null;
    }
  }
}
