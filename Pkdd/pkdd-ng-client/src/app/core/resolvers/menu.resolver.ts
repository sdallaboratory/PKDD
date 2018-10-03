import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MenuItem } from '../../models/core/menu-item';
import { Injectable } from '@angular/core';
import { MenuService } from '../services/menu.service';

export class MenuResolver {

    public static forItems(items: MenuItem[]) {
        @Injectable({ providedIn: 'root' })
        class Resolver implements Resolve<MenuItem[]> {
            constructor(
                private readonly menu: MenuService
            ) { }

            private readonly items = items;

            resolve(
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
            ) {
                this.menu.sideMenuItems = items;
                return items;
            }
        }
        return Resolver;
    }

    public static noItems() {
        return this.forItems(null);
    }
}
