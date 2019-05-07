import { PkddUser } from './../../models/auth/pkdd-user';
import { PkddRoles } from 'src/app/models/auth/pkdd-roles.enum';
export class IssueUserInfo {
    userId: number;
    name: string;
    email: string;
    mainRole: string;
    constructor(user: PkddUser) {
        this.userId = user.id;
        this.name = user.name;
        this.email = user.email;
        user.roles.includes('admin') ? this.mainRole = 'admin' :
            user.roles.includes('tech') ? this.mainRole = 'tech' :
                user.roles.includes('expert') ? this.mainRole = 'expert' : this.mainRole = 'undefined';
    }
}
