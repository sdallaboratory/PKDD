import { Injectable } from '@angular/core';
import { MenuItem } from '../../models/core/menu-item';
import { AuthService } from '../../auth/services/auth.service';
import { PkddUser } from '../../models/auth/pkdd-user';
import { PkddRoles } from '../../models/auth/pkdd-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private readonly auth: AuthService,
  ) {
    this.auth.userChanged.subscribe(user => this.onUserChanged(user));
    auth.getUserAsync().then(user => this.onUserChanged(user));
  }

  private onUserChanged(user: PkddUser) {
    if (user) {
      this.topMenuItems = [
        new MenuItem('Персоны', '/persons', 'people', true),
        new MenuItem('Аккаунт', '/account', 'settings', true),
        new MenuItem('Помощь', '/help', 'help_outline', true),
        ...(user.roles.includes(PkddRoles.admin) ? [
          new MenuItem('Администрирование', '/admin', 'verified_user', true)
        ] : [])
      ];
    }
  }

  public topMenuItems: MenuItem[];

  public sideMenuItems: MenuItem[];

  public sideMenuOpened: boolean;

}
