import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';
import { PkddRoles } from 'src/app/models/auth/pkdd-roles.enum';
import { PkddRouteData } from 'src/app/models/common/pkdd-route-data';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly auth: AuthService,
    private readonly guard: AuthGuard,
    private readonly router: Router
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const roles = (<PkddRouteData>route.data).roles;

    const verified = await this.guard.canActivate(route, state) && (!roles || !roles.length || await this.checkPermissions(roles));
    if (!verified) {
      this.router.navigateByUrl('/persons');
    }
    return verified;
  }

  private async checkPermissions(roles: PkddRoles[]): Promise<boolean> {
    const user = await this.auth.getUserAsync();
    return (roles as string[]).some(role => user.roles.includes(role as PkddRoles));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
