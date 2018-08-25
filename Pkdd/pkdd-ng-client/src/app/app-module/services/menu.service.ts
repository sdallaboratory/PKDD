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
    new MenuItem('Persons', '/persons'), new MenuItem('Account', '/account'), new MenuItem('Help', '/help')
  ];

  public sideMenuItems: MenuItem[] = [];

}
