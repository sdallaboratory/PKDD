import { MenuItem } from './../../models/core/menu-item';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { MenuService } from '../../core/services/menu.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { PkddRoles } from '../../models/auth/pkdd-roles.enum';

@Injectable({
    providedIn: 'root'
})
export class AdminMenuResolverService implements Resolve<MenuItem[]> {

    constructor(
        private readonly auth: AuthService,
        private readonly menu: MenuService
    ) { }

    public async resolve(
        route: ActivatedRouteSnapshot,
    ) {
        const user = await this.auth.getUserAsync();
        const id = route.paramMap.get('id');
        const items = [
            ...(user.roles.includes(PkddRoles.tech) ? [
            ] : []),
            ...(user.roles.includes(PkddRoles.admin) ? [
                new MenuItem('Пользователи', `/admin/user-list`, 'list', true),
                new MenuItem('Фидбек и ответы', '/admin/issues', 'question_answer', true)
            ] : []),
            // new MenuItem('Возник вопрос?', '/help/feedback', 'feedback', true)
        ];
        this.menu.sideMenuItems = items;
        return items;
    }
}
