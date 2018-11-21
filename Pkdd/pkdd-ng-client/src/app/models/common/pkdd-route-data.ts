import { PkddRoles } from '../auth/pkdd-roles.enum';
import { MenuItem } from '../core/menu-item';

export interface PkddRouteData {
    roles?: PkddRoles[];
    title?: string;
    sideMenuItems?: {
        [name in PkddRoles]?: MenuItem[];
    } & { common?: MenuItem[]; };
}
