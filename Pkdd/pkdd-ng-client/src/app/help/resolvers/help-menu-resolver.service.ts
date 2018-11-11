import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { Resolve } from '@angular/router';
import { MenuItem } from 'src/app/models/core/menu-item';

@Injectable({
  providedIn: 'root'
})
export class HelpMenuResolverService implements Resolve<MenuItem[]> {

  constructor(
    private readonly auth: AuthService,
    private readonly menu: MenuService
  ) { }

  public async resolve(
  ) {
    const user = await this.auth.getUserAsync();
    const items = [
      ...(user ? [
        new MenuItem('Обратная связь', '/help/feedback', 'feedback', true),
      ] : [
        ]),
      ...[
        new MenuItem('Описание проекта', '/help/description', 'description', true),
      ]
    ];
    this.menu.sideMenuItems = items;
    return items;
  }
}
