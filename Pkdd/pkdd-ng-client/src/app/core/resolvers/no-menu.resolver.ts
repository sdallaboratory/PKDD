import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MenuItem } from '../../models/core/menu-item';
import { Injectable } from '@angular/core';
import { MenuService } from '../services/menu.service';


@Injectable({ providedIn: 'root' })
export class NoMenuResolver implements Resolve<MenuItem[]> {
    constructor(
        private readonly menu: MenuService
    ) { }


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.menu.sideMenuItems = null;
        return null;
    }
}
