import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';

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
    new MenuItem('Persons', '/persons', 'people', true),
    new MenuItem('Account', '/account',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Gear_icon_svg.svg/1028px-Gear_icon_svg.svg.png'),
    new MenuItem('Help', '/help', 'help_outline', true)
  ];

  public sideMenuItems: MenuItem[] = [
    // Mock data
    new MenuItem('Persons', '/persons', 'people', true),
    new MenuItem('Account', '/account',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Gear_icon_svg.svg/1028px-Gear_icon_svg.svg.png'),
    new MenuItem('Help', '/help', 'help_outline', true)
  ];

  public sideMenuOpened: boolean;

}
