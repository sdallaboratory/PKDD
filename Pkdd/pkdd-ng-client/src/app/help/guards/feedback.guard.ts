import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PkddRoles } from 'src/app/models/auth/pkdd-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class FeedbackGuard implements CanActivate {

  constructor (
    private user: AuthService,
    private router: Router
  ) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = next.params.userId;
    const currentUser = await this.user.getUserAsync();
    const condition = userId === currentUser.id || currentUser.roles.includes(PkddRoles.admin);
    if (!condition) {
      this.router.navigate(['help/feedback']);
    }
    return condition;
  }
}
