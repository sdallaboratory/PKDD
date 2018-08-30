import { Injectable } from '@angular/core';
import { MenuItem } from '../../models/core/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    // auth: AuthService,
  ) { }

  public isDisplayed = true;

  public topMenuItems: MenuItem[] = [
    // Mock data
    new MenuItem('Персоны', '/persons', 'people', true),
    new MenuItem('Аккаунт', '/account',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Gear_icon_svg.svg/1028px-Gear_icon_svg.svg.png'),
    new MenuItem('Помощь', '/help', 'help_outline', true),
    new MenuItem('Администрирование', '/admin', 'verified_user', true)
  ];

  public sideMenuItems: MenuItem[] = [
    // Mock data
    new MenuItem('Persons', '/persons', 'people', true),
    new MenuItem('Account', '/account',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Gear_icon_svg.svg/1028px-Gear_icon_svg.svg.png'),
    new MenuItem('Help', '/help', 'help_outline', true),
    new MenuItem('Help', '/help', 'help_outline', true),
    new MenuItem('Help', '/help', 'help_outline', true)
  ];

  public sideMenuOpened: boolean;

}
