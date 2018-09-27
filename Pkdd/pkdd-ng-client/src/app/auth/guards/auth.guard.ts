import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PkddRoles } from '../../models/auth/pkdd-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (!await this.auth.isAuthedAsync()) {
      console.log('redirected to auth');
      this.router.navigate(['/auth']);
    }
    return await this.auth.isAuthedAsync();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }

  public static forRoles(roles: PkddRoles | PkddRoles[]) {
    if (typeof roles === 'string') {
      roles = roles.split(' ') as PkddRoles[];
    }

    @Injectable({
      providedIn: 'root'
    })
    class RoleGuard implements CanActivate {
      constructor(
        private readonly auth: AuthService,
        private readonly guard: AuthGuard
      ) { }

      public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.guard.canActivate(route, state) && await this.checkPermissions();
      }

      private async checkPermissions() {
        const user = await this.auth.getUserAsync();
        console.log(roles, user.roles);
        return (roles as string[]).some(role => user.roles.includes(role as PkddRoles));
      }
    }

    return RoleGuard;
  }
}
