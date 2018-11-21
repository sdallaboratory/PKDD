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

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authed = await this.auth.isAuthedAsync();
    if (!authed) {
      this.router.navigateByUrl('/auth');
    }
    return authed;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

}
