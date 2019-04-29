import { MenuItem } from '../../models/core/menu-item';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { AuthService } from '../../auth/services/auth.service';
import { PkddRoles } from '../../models/auth/pkdd-roles.enum';

@Injectable({ providedIn: 'root' })
export class PersonMenuResolver implements Resolve<MenuItem[]> {
    constructor(
        private readonly auth: AuthService,
        private readonly menu: MenuService
    ) { }

    public async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        const user = await this.auth.getUserAsync();
        const id = route.paramMap.get('id');
        const items = [
            new MenuItem('Информация', `/persons/${id}`, 'info', true),
            ...(user.roles.includes(PkddRoles.expert) ? [
                new MenuItem('Шкалирование', `/persons/${id}/mmpi`, 'assessment', true),
                // new MenuItem('Цветовой тест', `/persons/${id}/luscher`, 'palette', true),
                // new MenuItem('Физиогномика', `/persons/${id}/physiognomy`, 'face', true),
            ] : []),
            ...(user.roles.includes(PkddRoles.tech) ? [
                new MenuItem('Редактирование', `/persons/${id}/edit`, 'edit', true),
                new MenuItem('Результаты', `/persons/${id}/results`, 'assignment_turned_in', true),
            ] : []),
            // new MenuItem('Возник вопрос?', '/help/feedback', 'feedback', true)
        ];
        this.menu.sideMenuItems = items;
        return items;
    }
}
